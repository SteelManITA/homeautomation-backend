export interface Device
{
  id: number;
  name: string;
  type: 'air-conditioner' | 'light';
  room: string;
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

export interface Room
{
  name: string,
  devices: Device[],
}