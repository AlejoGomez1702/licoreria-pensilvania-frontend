import { ComponentType } from '@angular/cdk/portal';
import { Button } from './button.model';

export interface Marco {
  title: string;
  component: ComponentType<any>;
  dataComponent: any;
  maxWidth?: string;
  actions?: {
    primary?: string;
    secondary?: string;
    otherButtons?: Button[]
  };
}
