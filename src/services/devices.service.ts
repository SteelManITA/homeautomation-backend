import { Device, Room, AirConditionerDevice, LightDevice } from './../models/models';
import { Decode } from './../decode';
import { IRSlinger } from './irslinger.service';
import { AirConditionerArgs, AirConditioner } from './../airconditioner';
import { sync as loadJsonFile } from 'load-json-file';
import { sync as writeJsonFile } from 'write-json-file';

export class DevicesService
{
  private static instance: DevicesService = null;

  private devices: Device[];
  private rooms: Room[];

  private constructor (
  ) {
  }

  private load(): void
  {
    this.devices = loadJsonFile('devices.json');
    const rooms: {[key: string]: Room} = {};

    for (const device of this.devices) {
      if (rooms.hasOwnProperty(device.room)) {
        (rooms[device.room] as Room).devices.push(device);
      } else {
        rooms[device.room] = <Room>{
          name: device.room,
          devices: [device],
        };
      }
    }

    this.rooms = Object.keys(rooms).map(function (key) {
        return rooms[key];
    });
  }

  private save(data: Device | Device[]): void
  {
    if (!Array.isArray(data)) {
      for (let i = 0; i < this.devices.length; ++i) {
        if (this.devices[i].id === data.id) {
          this.devices[i] = data;
        }
      }
    }

    writeJsonFile('devices.json', this.devices);
  }

  public static getInstance(): DevicesService
  {
    if (!this.instance) {
      this.instance = new DevicesService();
    }
    this.instance.load();
    return this.instance;
  }

  public getAll(): Device[]
  {
    return this.devices;
  }

  public get(id: number): Device
  {
    for (const device of this.devices) {
      if (device.id === id) {
        return device;
      }
    }
    return null;
  }

  public send(id: number, data: AirConditionerArgs | any): Device
  {
    const device: Device = this.get(id);

    switch (device.type) {
      case 'air-conditioner': {
        try {
          const acDevice = device as AirConditionerDevice;

          acDevice.state = data.state ? data.state : acDevice.state;
          acDevice.mode = data.mode ? data.mode : acDevice.mode;
          acDevice.fanSpeed = data.fanSpeed ? data.fanSpeed : acDevice.fanSpeed;
          acDevice.swing = data.swing ? data.swing : acDevice.swing;
          acDevice.temperature = data.temperature ? data.temperature : acDevice.temperature;

          let bin: string;
          bin = new AirConditioner().toBin(acDevice);
          new IRSlinger().sling({
            program: "./irslinger",
            code: '' + new Decode().decode(bin) + ''
          });
        } catch (e) {
          throw new Error('Bad parameters');
        }
        break;
      }
      case 'light': {
        const lDevice = device as LightDevice;

        lDevice.state = data.state ? data.state : lDevice.state;
        break;
      }
      default: {
        throw new Error('Unrecognized device type');
      }
    }

    this.save(device);
    return device;
  }

  public getRooms(): Room[]
  {
    return this.rooms;
  }
}
