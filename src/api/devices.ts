import { Device } from './../models/models';
import { AirConditionerArgs } from '../airconditioner';
import { DevicesService } from '../services/devices.service';
import { Request, Response, Router } from "express";
import { BaseApiRoute } from "./apiroute";

export class DevicesRoute
  extends BaseApiRoute
{
  public static create(router: Router) {
    const devicesService: DevicesService = DevicesService.getInstance();

    router.get('/devices', (req: Request, res: Response) => {
      new DevicesRoute().response(res, devicesService.getAll());
    });

    router.get('/devices/:id', (req: Request, res: Response) => {
      if (!req.params.hasOwnProperty('id')) {
        new DevicesRoute().response(res, '', 400, 'Missing parameter: id');
      }
      new DevicesRoute().response(res, devicesService.get(Number(req.params.id)));
    });

    router.post('/devices/:id', (req: Request, res: Response) => {
      if (!req.params.hasOwnProperty('id')) {
        new DevicesRoute().response(res, '', 400, 'Missing parameter: id');
      }

      try {
        const device: Device = devicesService.send(Number(req.params.id), (req.body as AirConditionerArgs));
        new DevicesRoute().response(res, device, 200, 'OK');
      } catch (e) {
        new DevicesRoute().response(res, '', 405, e.message);
      }
    });

    router.get('/rooms', (req: Request, res: Response) => {
      new DevicesRoute().response(res, devicesService.getRooms());
    });
  }

}
