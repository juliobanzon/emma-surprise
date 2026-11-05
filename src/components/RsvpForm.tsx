/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ExternalLink, Loader2, Sparkles, Send } from 'lucide-react';
import { TapeStrip } from './CollageElements';
import { EVENT_DETAILS } from '../data/partyDetails';
import { RsvpSubmission } from '../types';

interface RsvpFormProps {
  accessToken?: string | null;
  onLogin?: () => void;
  onSubmissionSuccess?: (sub: RsvpSubmission) => void;
  telegramUrl?: string;
  sheetWebhookUrl?: string;
  onOpenOrganizer?: () => void;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({
  telegramUrl = EVENT_DETAILS.defaultTelegramUrl,
  onOpenOrganizer,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const googleFormUrl = EVENT_DETAILS.googleFormUrl;
  const googleFormEmbedUrl = EVENT_DETAILS.googleFormEmbedUrl;

  return (
    <section id="rsvp" className="py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Official Party Dispatch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            RSVP &amp; Birthday Message Form
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Please let Julio know if you can make it before 5:00 PM on Nov 21, and leave your secret birthday note or video greeting for Emma below!
          </p>
        </div>

        {/* Quick External Links Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Google Form is live &amp; syncing directly</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
            >
              <span>Open Form in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {telegramUrl && (
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
              >
                <span>Telegram Chat</span>
                <Send className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Embedded Google Form Card Container */}
        <div className="relative bg-white rounded-3xl p-2 sm:p-5 border-2 border-slate-200/90 shadow-[3px_5px_0px_rgba(0,0,0,0.06)] overflow-hidden">
          <TapeStrip rotation="-rotate-6" className="absolute -top-2 left-10 z-10" />
          <TapeStrip rotation="rotate-6" className="absolute -top-2 right-10 z-10" />

          {/* Loading Indicator */}
          {isLoading && (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-[#1E3A5F]" />
              <div className="text-xs font-semibold">Loading Google Form…</div>
            </div>
          )}

          {/* The Embed IFrame */}
          <div className={`w-full transition-opacity duration-300 ${isLoading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
            <iframe
              src={googleFormEmbedUrl}
              width="100%"
              height="1150"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              onLoad={() => setIsLoading(false)}
              className="w-full rounded-2xl border-0 bg-transparent min-h-[950px] sm:min-h-[1150px]"
              title="Emma's Surprise Party RSVP Google Form"
            >
              Loading Google Form…
            </iframe>
          </div>

          {/* Fallback Helper Footer */}
          <div className="pt-4 pb-2 px-3 border-t border-slate-100 text-center space-y-1 text-xs text-slate-500">
            <div>
              Trouble viewing the form on your device?{' '}
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1E3A5F] hover:underline font-bold inline-flex items-center gap-1"
              >
                Click here to open the Google Form directly
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            {onOpenOrganizer && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={onOpenOrganizer}
                  className="text-[11px] text-slate-400 hover:text-slate-700 underline"
                >
                  Julio&apos;s Secret Command Deck
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
