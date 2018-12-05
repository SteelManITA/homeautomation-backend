import * as ChildProcess from 'child_process';

export type CommandType = { program: string, code: string };

export class IRSlinger
{
  private queue: CommandType[] = [];
  // Per eseguire un solo comando alla volta
  private commandRunning: boolean = false;

  constructor (
  ) {
  }

  private commandPromise(command): Promise<string>
  {
    return new Promise( (resolve, reject) => {
      ChildProcess.exec(command, (err, stdout, stderr) => {
        console.log(command);
        if (err) {
          reject(err);
        } else {
          // console.log(stdout);
          resolve(stdout);
        }
      });
    });
  }

  private runCommands()
  {
    if (this.queue.length > 0 && !this.commandRunning) {
      this.commandRunning = true;
      const command: CommandType = this.queue.shift();

      // TODO: validare il comando: non è molto sicuro eseguire qualunque cosa da amministratore
      // this.commandPromise('sudo ' + command.program + ' ' + command.code)
      this.commandPromise(command.program + ' ' + command.code).
        then((stdout) => {
          this.commandRunning = false;
          this.runCommands();
        }).
        catch((err) => {
          this.commandRunning = false;
        });
    }
  }

  public sling(command: CommandType)
  {
    this.queue.push(command);

    // Rimuove i comandi più vecchi se la coda diventa troppo lunga
    if (this.queue.length > 5) {
      this.queue.shift();
    }

    this.runCommands();
  };
}
