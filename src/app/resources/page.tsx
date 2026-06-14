import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Border } from '@/components/Border'
import { ContactBlock } from '@/components/ContactBlock'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'How Emily Farmer becomes part of your team as a remote, on call graphic designer for your church.',
}

export default function ResourcesPage() {
  return (
    <>
      <PageIntro eyebrow="Resources" title="Your remote, on call designer.">
        <p>
          Hi, I&rsquo;m Emily. After onboarding, I become part of your team, the same way a remote graphic designer on staff would be. I learn your church brand and work with you to build your vision and create a cohesive look for all your design elements.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32">
        <FadeIn className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <Border className="pt-10">
            <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-neutral-950">
              Embedded in your team.
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              After onboarding I&rsquo;m part of your team, the same way a remote graphic designer on staff would be. I get added to your shared drive, I learn the rhythm of your services, and I show up for the work the same way an in-house designer would.
            </p>
          </Border>

          <Border className="pt-10">
            <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-neutral-950">
              Building a cohesive look.
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              Most churches end up with visuals that drift over time. Different volunteers, different tools, different weeks. Part of my job is to pull that back together into one cohesive look across your sermon graphics, social, signage, and print.
            </p>
          </Border>
        </FadeIn>
      </Container>

      <Container className="mt-24 sm:mt-32">
        <FadeIn className="rounded-3xl bg-[var(--color-cta)]/15 p-10 ring-1 ring-inset ring-[var(--color-cta)]/30">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-neutral-950">
            Want to work together?
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-neutral-700">
            I&rsquo;m taking on a small number of new churches this quarter. Send me a message about your church and the vision you are wanting to build.
          </p>
        </FadeIn>
      </Container>

      <ContactBlock heading="Tell me about your church.">
        <p>
          Send me a message about your church and I will reply very quickly. Onboarding is fast and effortless so the design work can start right away.
        </p>
      </ContactBlock>
    </>
  )
}
