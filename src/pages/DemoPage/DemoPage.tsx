// NOTE: It isn't used: used the `Demo` inside the `AppRouterWrapper` component

import { AppWrapper } from 'src/ui/wrappers/AppWrapper';
import { FullScreenPageLayout } from 'src/ui/layouts/FullScreenPageLayout';
import { Demo } from 'src/components/Demo';

export function DemoPage() {
  return (
    <AppWrapper>
      <FullScreenPageLayout>
        {/* Placeholder for the app page */}
        <Demo />
      </FullScreenPageLayout>
    </AppWrapper>
  );
}
