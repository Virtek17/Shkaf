import { CheckingStage } from './checking-stage';
import { UnavailableStage } from './unavailable-stage';
import { PaymentStage } from './payment-stage';
import { ExpiredStage } from './expired-stage';
import { PickupStage } from './pickup-stage';
import { KitStage } from './kit-stage';
import { ProblemStage } from './problem-stage';
import { ProblemPreparedStage } from './problem-prepared-stage';
import { ActiveStage } from './active-stage';
import type { StageProps } from './stage-props';

export function RentalStageView(props: StageProps) {
  switch (props.stage) {
    case 'checking': return <CheckingStage {...props} />;
    case 'unavailable': return <UnavailableStage {...props} />;
    case 'payment':
    case 'paying':
    case 'payment-error': return <PaymentStage {...props} />;
    case 'expired': return <ExpiredStage {...props} />;
    case 'pickup':
    case 'opening':
    case 'locker-error': return <PickupStage {...props} />;
    case 'kit': return <KitStage {...props} />;
    case 'problem': return <ProblemStage {...props} />;
    case 'problem-sent': return <ProblemPreparedStage {...props} />;
    case 'active': return <ActiveStage {...props} />;
    default: return null;
  }
}
