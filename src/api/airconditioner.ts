import { AirConditionerArgs } from './../airconditioner';
import { DevicesService, Device } from './../services/devices.service';
import { Request, Response, Router } from "express";
import { BaseApiRoute } from "./apiroute";

export class AirConditionerRoute
  extends BaseApiRoute
{
  public static create(router: Router) {
    const devicesService: DevicesService = DevicesService.getInstance();

    router.get('/devices', (req: Request, res: Response) => {
      new AirConditionerRoute().response(res, devicesService.getAll());
    });

    router.get('/devices/:id', (req: Request, res: Response) => {
      if (!req.params.hasOwnProperty('id')) {
        new AirConditionerRoute().response(res, '', 400, 'Missing parameter: id');
      }
      new AirConditionerRoute().response(res, devicesService.get(Number(req.params.id)));
    });

    router.post('/devices/:id', (req: Request, res: Response) => {
      if (!req.params.hasOwnProperty('id')) {
        new AirConditionerRoute().response(res, '', 400, 'Missing parameter: id');
      }

      try {
        const device: Device = devicesService.send(Number(req.params.id), (req.body as AirConditionerArgs));
        new AirConditionerRoute().response(res, device, 200, 'OK');
      } catch (e) {
        new AirConditionerRoute().response(res, '', 405, e.message);
      }
    });
  }

}
