import { AppWrapper } from 'src/ui/wrappers/AppWrapper';
import { FullScreenPageLayout } from 'src/ui/layouts/FullScreenPageLayout';
import { AppRouterWrapper } from 'src/ui/wrappers/AppRouterWrapper';

export function AppPage() {
  return (
    <AppWrapper>
      <FullScreenPageLayout>
        <AppRouterWrapper>
          {/* Placeholder for the main app page content */}
          ReactFlowAppRoot
        </AppRouterWrapper>
      </FullScreenPageLayout>
    </AppWrapper>
  );
}
