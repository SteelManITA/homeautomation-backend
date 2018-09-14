import { IRSlinger } from './../services/irslinger';
import { Decode } from './../decode';
import { Request, Response, Router } from "express";
import { BaseApiRoute } from "./apiroute";
import { AirConditioner, AirConditionerArgs } from './../airconditioner';

export class AirConditionerRoute
extends BaseApiRoute
{

  public static create(router: Router) {
    console.log("[IndexApiRoute::create] Creating index api route.");

    router.get('/', (req: Request, res: Response) => {
      const args: AirConditionerArgs = req.query;

      let bin: string;

      try {
        bin = new AirConditioner().toBin(args);
      } catch (e) {
        new AirConditionerRoute().response(res, '', 405, e);
      }

      new IRSlinger().sling({
        program: "./irslinger",
        code: '' + new Decode().decode(bin) + ''
      });

      new AirConditionerRoute().response(res, 'ci siamo', 200, 'OK');
    });
  }

}
