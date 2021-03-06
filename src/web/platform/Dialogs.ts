import { Dialogs as IDialogs } from 'common/dialogs/Dialogs';

export class WebDialogs implements IDialogs {
  public showDialog = async (message: string) => {
    const result = confirm(message);
    return result ? 'yes' : 'no';
  };
}
