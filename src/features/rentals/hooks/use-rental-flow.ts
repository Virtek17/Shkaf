import { useCallback, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useProduct } from '@/entities/product';
import { environment } from '@/shared/config/environment';
import { routeParam } from '@/shared/lib/route-param';
import { useClock } from '@/shared/hooks/use-clock';
import { getRentalPeriod } from '../constants/rental-options';
import { createPreviewSession } from '../dev/preview-session';
import { stageContent } from '../model/stage-content';
import { formatCountdown } from '../model/format';
import { resolveRental, rentalSessionsReducer, type RentalCommand, type RentalEvent, type RentalSessions, type RentalStage } from '../model/rental-session';
import { useRentalSessions } from './use-rental-sessions';
import { useRentalOperation } from './use-rental-operation';

export function useRentalFlow() {
  const params = useLocalSearchParams<{ id?: string | string[]; rentalId?: string | string[] }>();
  const id = routeParam(params.id) ?? '';
  const rentalId = routeParam(params.rentalId);
  const router = useRouter();
  const { sessions, dispatch, service } = useRentalSessions();
  const current = params.rentalId !== undefined && !rentalId ? undefined : resolveRental(sessions, id, rentalId);
  const [preview, setPreview] = useState<RentalSessions | null>(null);
  const [previewSource, setPreviewSource] = useState<string | null>(null);
  const [paused, setPaused] = useState(true);
  const previewSession = environment.demoTools && current?.rentalId === previewSource ? preview?.preview : undefined;
  const previewDispatch = useCallback((event: RentalEvent) => setPreview((state) => state ? rentalSessionsReducer(state, event) : state), []);
  useRentalOperation(previewSession, previewDispatch, service, paused);
  const session = previewSession ?? current;
  const liveProduct = useProduct(id);
  const product = session?.product ?? liveProduct;
  const period = session && getRentalPeriod(session.period);
  const stage = session?.stage;
  const now = useClock(session?.expiresAt !== undefined);
  const [demoVisible, setDemoVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'Карта' | 'СБП'>('Карта');
  const [attachmentNotice, setAttachmentNotice] = useState(false);
  const send = (event: RentalCommand) => {
    if (!session) return;
    setPaused(false);
    const action: RentalEvent = { ...event, rentalId: session.rentalId, now: Date.now() };
    if (previewSession) previewDispatch(action); else dispatch(action);
  };
  // Обработчики передаются в представления, а события проверяет чистая модель.
  const actions = {
    pay: () => send({ type: 'PAYMENT_REQUESTED' }),
    retryPayment: () => send({ type: 'PAYMENT_RETRY' }),
    openLocker: () => send({ type: 'LOCKER_OPEN_REQUESTED' }),
    checkAgain: () => send({ type: 'RECHECK' }),
    toggleKit: (index: number) => send({ type: 'KIT_TOGGLED', index }),
    confirmKit: () => send({ type: 'KIT_CONFIRMED' }),
    openProblem: () => send({ type: 'PROBLEM_OPENED' }),
    changeProblem: (value: { reason?: string; description?: string }) => send({ type: 'PROBLEM_CHANGED', ...value }),
    prepareProblem: () => send({ type: 'PROBLEM_PREPARED' }),
    editProblem: () => send({ type: 'PROBLEM_EDITED' }),
    closeProblem: () => send({ type: 'PROBLEM_CLOSED' }),
  };
  const catalogue = () => router.replace('/');
  const openRentals = () => router.replace('/rental');
  const back = () => { if (router.canGoBack()) router.back(); else openRentals(); };
  const selectPreview = (next: RentalStage) => {
    if (!current || !environment.demoTools) return;
    setPreview({ preview: createPreviewSession(current, next, Date.now()) });
    setPreviewSource(current.rentalId);
    setPaused(true);
    setDemoVisible(false);
  };
  const exitPreview = () => { setPreview(null); setPaused(true); setDemoVisible(false); };
  const continuePreview = () => { setPaused(false); setDemoVisible(false); };
  return { session, product, period, stage, content: stage ? stageContent[stage] : undefined,
    countdown: formatCountdown((session?.expiresAt ?? now) - now), total: session?.total ?? 0,
    demoVisible, setDemoVisible, previewStage: previewSession?.stage, selectPreview, exitPreview, continuePreview,
    paymentMethod, setPaymentMethod, attachmentNotice, setAttachmentNotice, actions, catalogue, openRentals, back };
}

export type RentalFlowController = ReturnType<typeof useRentalFlow>;

