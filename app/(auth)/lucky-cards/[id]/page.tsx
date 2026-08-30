"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import ScratchCard from "@/components/LuckyCard/ScratchCard";
import {
  useGetMyLuckyCardsQuery,
  useOpenLuckyCardMutation,
} from "@/redux/features/luckyCard/luckyCardApi";

const bdt = (n: any) => `BDT ${Number(n || 0).toLocaleString("en-US")}`;

export default function ScratchLuckyCardPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading } = useGetMyLuckyCardsQuery();
  const [openCard] = useOpenLuckyCardMutation();

  const [result, setResult] = useState<any>(null); // opened card payload
  const [modal, setModal] = useState(false);
  const opening = useRef(false);

  const cards = data?.cards || [];
  const card = useMemo(() => cards.find((c: any) => c._id === id), [cards, id]);
  const queue = useMemo(
    () =>
      cards
        .filter((c: any) => c.status === "unopened" && c._id !== id)
        .map((c: any) => c._id),
    [cards, id],
  );

  useEffect(() => {
    if (card && card.status === "opened" && !result) {
      setResult(card);
      setModal(true);
    }
  }, [card, result]);

  const fetchResult = useCallback(async () => {
    if (opening.current || (card && card.status === "opened")) return;
    opening.current = true;
    try {
      const res: any = await openCard(id);
      if (res?.data?.success) {
        setResult(res.data.card);
        if (res.data.card.win) {
          confetti({ particleCount: 130, spread: 75, origin: { y: 0.6 } });
        }
      } else {
        toast.error(res?.error?.data?.message || "Failed to open");
        opening.current = false;
      }
    } catch {
      opening.current = false;
    }
  }, [card, id, openCard]);

  const nextCard = () => {
    if (queue[0]) {
      router.push(`/lucky-cards/${queue[0]}`);
      setResult(null);
      setModal(false);
      opening.current = false;
    } else {
      router.push("/lucky-cards");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }
  if (!card) {
    return (
      <div className="adnexa-glass-card rounded-2xl p-6 text-center text-sm text-slate-400">
        Card not found.{" "}
        <button
          className="text-cyan-300"
          onClick={() => router.push("/lucky-cards")}
        >
          Go back
        </button>
      </div>
    );
  }

  const win = !!result?.win;
  const amount = Number(result?.prize_amount || 0);
  const symbol = result?.reveal_symbol || "🪙";

  return (
    <div className="flex flex-col items-center gap-5 pt-2 text-slate-200">
      <div className="text-center">
        <p className="text-lg font-black" style={{ color: card.accent }}>
          {card.card_type}
        </p>
        <p className="text-xs text-slate-400">
          Scratch with your finger to reveal the amount
        </p>
      </div>

      <ScratchCard
        size={280}
        accent={card.accent}
        disabled={card.status === "opened"}
        onFirstScratch={fetchResult}
        onComplete={() => setModal(true)}
      >
        <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
          <span className="text-5xl">{result ? (win ? symbol : "🙁") : "❔"}</span>
          {result ? (
            win ? (
              <>
                <span className="text-4xl font-black text-green-400 drop-shadow">
                  {bdt(amount)}
                </span>
                <span className="text-xs text-slate-400">You won</span>
              </>
            ) : (
              <span className="text-lg font-bold text-slate-400">No win</span>
            )
          ) : (
            <span className="text-sm text-slate-500">Start scratching…</span>
          )}
        </div>
      </ScratchCard>

      {card.status === "opened" && result && (
        <div className="w-full space-y-3">
          <div className="adnexa-glass-card rounded-2xl p-4 text-center">
            {win ? (
              <p className="text-2xl font-black text-green-400">
                You won {bdt(amount)} 🎉
              </p>
            ) : (
              <p className="text-sm text-slate-400">No win on this card</p>
            )}
            <p className="mt-1 text-[11px] text-slate-500">Added to your balance</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => router.push("/lucky-cards")}
              className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-semibold"
            >
              All Cards
            </button>
            {queue.length > 0 && (
              <button
                onClick={nextCard}
                className="flex-1 rounded-xl bg-cyan-500 py-3 text-sm font-semibold text-black"
              >
                Next Card ({queue.length})
              </button>
            )}
          </div>
        </div>
      )}

      {/* prize modal */}
      {modal && card.status === "opened" && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-[320px] rounded-3xl border border-white/10 bg-[#0b0f24] p-6 text-center">
            <div className="mb-3 text-5xl">{win ? "🎉" : "🙂"}</div>
            <h3 className="text-lg font-bold">
              {win ? "Congratulations!" : "Not this time"}
            </h3>
            {win ? (
              <p className="mt-1 text-3xl font-black text-green-400">
                {bdt(amount)}
              </p>
            ) : (
              <p className="mt-1 text-sm text-slate-400">Try the next card</p>
            )}
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setModal(false)}
                className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-semibold"
              >
                Close
              </button>
              {queue.length > 0 && (
                <button
                  onClick={nextCard}
                  className="flex-1 rounded-xl bg-cyan-500 py-2.5 text-sm font-semibold text-black"
                >
                  Next Card
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
