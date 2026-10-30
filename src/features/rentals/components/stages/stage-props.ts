import type { RentalFlowController } from '../../hooks/use-rental-flow';
import type { Product } from '@/entities/product';
import type { RentalSession } from '../../model/rental-session';
import type { getRentalPeriod } from '../../constants/rental-options';
import type { stageContent } from '../../model/stage-content';

export type StageProps = RentalFlowController & { session: RentalSession; product: Product; period: NonNullable<ReturnType<typeof getRentalPeriod>>; content: (typeof stageContent)[keyof typeof stageContent] };
