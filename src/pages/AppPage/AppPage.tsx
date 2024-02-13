import { AppWrapper } from 'src/ui/wrappers/AppWrapper';
import { FullScreenPageLayout } from 'src/ui/layouts/FullScreenPageLayout';
import { AppRouterWrapper } from 'src/ui/wrappers/AppRouterWrapper';
import { ShowData } from 'src/components/Data/ShowData';

export function AppPage() {
  return (
    <AppWrapper>
      <FullScreenPageLayout>
        <AppRouterWrapper>
          {/* Placeholder for the main app page content */}
          <ShowData />
        </AppRouterWrapper>
      </FullScreenPageLayout>
    </AppWrapper>
  );
}
