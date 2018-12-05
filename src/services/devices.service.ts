import { Decode } from './../decode';
import { IRSlinger } from './irslinger.service';
import { AirConditionerArgs, AirConditioner } from './../airconditioner';
import { sync as loadJsonFile } from 'load-json-file';
import { sync as writeJsonFile } from 'write-json-file';

export interface Device
{
  id: number;
  name: string;
  type: 'air-conditioner';
}

export interface AirConditionerDevice
  extends Device
{
  state: 'on' | 'off';
  mode: 'cool' | 'heat' | 'dry' | 'auto';
  fanSpeed: 'lowest' | 'low' | 'medium' | 'high' | 'highest' | 'auto';
  swing: 'lowest' | 'low' | 'medium' | 'high' | 'highest' | 'auto';
  temperature: 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;
}

export class DevicesService
{
  private static instance: DevicesService = null;

  private devices: Device[];

  private constructor (
  ) {
  }

  private load(): void
  {
    this.devices = loadJsonFile('devices.json');
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
      default: {
        throw new Error('Unrecognized device type');
      }
    }

    this.save(device);
    return device;
  }
}
