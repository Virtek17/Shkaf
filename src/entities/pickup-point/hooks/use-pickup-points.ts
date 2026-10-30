import { useContext } from 'react';
import { PickupPointContext } from '../model/pickup-point-context';
export function usePickupPoints() {
 const state = useContext(PickupPointContext);
 if (!state) throw new Error('PickupPointProvider is required');
 return state;
}
