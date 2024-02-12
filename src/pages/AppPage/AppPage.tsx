import { AppWrapper } from 'src/ui/wrappers/AppWrapper';
import { FullScreenPageLayout } from 'src/ui/layouts/FullScreenPageLayout';
import { AppRouterWrapper } from 'src/ui/wrappers/AppRouterWrapper';

export function AppPage() {
  return (
    <AppWrapper>
      <FullScreenPageLayout>
        <AppRouterWrapper>
          {/* Placeholder for the app page */}
          ReactFlowAppRoot
        </AppRouterWrapper>
      </FullScreenPageLayout>
    </AppWrapper>
  );
}