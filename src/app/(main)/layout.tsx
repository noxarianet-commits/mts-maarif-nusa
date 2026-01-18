import { MainLayout } from '@/components/layout';

export default function MainPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
