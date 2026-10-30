import { PickupPointProvider, demoPickupPointRepository } from '@/entities/pickup-point';
import type { ReactNode } from 'react';
import { AppErrorBoundary } from '@/shared/diagnostics/error-boundary';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { ProductProvider, demoProductRepository, getInitialProducts } from '@/entities/product';
import { RentalSessionProvider, createDemoRentalService } from '@/features/rentals';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';

const rentalService = createDemoRentalService(demoProductRepository);

export function AppProviders({ children }: { children: ReactNode }) {
  const scheme = useColorScheme();
  return <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
    <AppErrorBoundary><ProductProvider repository={demoProductRepository} initialProducts={getInitialProducts()}>
      <PickupPointProvider repository={demoPickupPointRepository}><RentalSessionProvider service={rentalService}>{children}</RentalSessionProvider></PickupPointProvider>
    </ProductProvider></AppErrorBoundary>
  </ThemeProvider>;
}

