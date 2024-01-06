import AppIcon from './app_icon';
import clsx from 'clsx';

import { capitalize } from '../utilities';

type Props = {
  appName?: string;
};

export default function AppIconName({ appName }: Props) {
  const nameProvided: boolean = appName != null;
  appName = nameProvided ? appName : '{App Name}';

  return (
    <div className=' mx-auto flex flex-col gap-4'>
      <AppIcon />
      <p
        className={clsx('text-center text-xl', {
          'text-red-600': !nameProvided,
        })}>
        {capitalize(appName!)}
      </p>
    </div>
  );
}
