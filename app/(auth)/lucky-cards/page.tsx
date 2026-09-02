"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  useBuyLuckyPackageMutation,
  useGetLuckyShopQuery,
  useGetMyLuckyCardsQuery,
} from "@/redux/features/luckyCard/luckyCardApi";

const bdt = (n: any) => `BDT ${Number(n || 0).toLocaleString("en-US")}`;

export default function LuckyCardsPage() {
  const router = useRouter();
  const { user } = useSelector((s: any) => s.auth);
  const { data: shopData, isLoading } = useGetLuckyShopQuery();
  const { data: unopenedData, refetch: refetchCards } =
    useGetMyLuckyCardsQuery("unopened");
  const { data: openedData } = useGetMyLuckyCardsQuery("opened");
  const [buy, buyState] = useBuyLuckyPackageMutation();

  const [tab, setTab] = useState<"shop" | "cards">("shop");
  const [busyPkg, setBusyPkg] = useState<string | null>(null);

  const shop = shopData?.shop || [];
  const unopened = unopenedData?.cards || [];
  const opened = openedData?.cards || [];

  const handleBuy = async (pkgId: string, price: number) => {
    if (Number(user?.m_balance || 0) < price) {
      toast.error("Insufficient balance — please deposit first");
      router.push("/deposit");
      return;
    }
    setBusyPkg(pkgId);
    try {
      const res: any = await buy({ packageId: pkgId });
      if (res?.data?.success) {
        toast.success(`${res.data.purchase.quantity} cards added`);
        await refetchCards();
        setTab("cards");
      } else {
        toast.error(res?.error?.data?.message || "Purchase failed");
      }
    } finally {
      setBusyPkg(null);
    }
  };

  return (
    <div className="space-y-5 text-slate-200">
      <div>
        <h1 className="text-2xl font-bold">🍀 Lucky Card</h1>
        <p className="text-sm text-slate-400">
          Scratch to reveal your prize instantly
        </p>
      </div>

      {/* balance + deposit */}
      <div className="adnexa-glass-card flex items-center justify-between rounded-2xl p-4">
        <div>
          <p className="text-xs text-slate-400">Balance</p>
          <p className="text-xl font-bold">{bdt(user?.m_balance)}</p>
        </div>
        <Link
          href="/deposit"
          className="rounded-xl bg-cyan-500/90 px-4 py-2 text-sm font-semibold text-black"
        >
          Deposit
        </Link>
      </div>

      {/* tabs */}
      <div className="flex rounded-2xl border border-white/10 bg-white/5 p-1 text-sm">
        {(["shop", "cards"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-xl py-2 font-medium transition ${
              tab === t ? "bg-cyan-500 text-black" : "text-slate-400"
            }`}
          >
            {t === "shop" ? "Shop" : `My Cards (${unopened.length})`}
          </button>
        ))}
      </div>

      {tab === "shop" && (
        <>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Spinner size="xl" />
            </div>
          ) : (
            shop.map((t: any) => (
              <div key={t._id} className="adnexa-glass-card space-y-3 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold" style={{ color: t.accent }}>
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-400">{bdt(t.price)}/card</p>
                </div>

                {/* headline top prize — marketing hook */}
                <div className="rounded-xl border border-amber-400/25 bg-gradient-to-br from-amber-400/15 to-transparent px-4 py-3 text-center">
                  <p className="text-[11px] uppercase tracking-wide text-amber-200/70">
                    Top Prize
                  </p>
                  <p className="text-2xl font-black text-amber-300 drop-shadow">
                    {bdt(t.top_prize)}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {t.packages.map((p: any) => {
                    const hasOffer =
                      Number(p.regular_price || 0) > Number(p.price || 0);
                    return (
                      <button
                        key={p._id}
                        disabled={buyState.isLoading && busyPkg === p._id}
                        onClick={() => handleBuy(p._id, p.price)}
                        className="relative rounded-xl border border-white/10 bg-white/5 p-2 text-center transition hover:border-cyan-400 disabled:opacity-50"
                      >
                        {hasOffer && (
                          <span className="absolute -right-1 -top-2 rounded-full bg-rose-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                            -{p.discount_percent}%
                          </span>
                        )}
                        <p className="text-lg font-black">{p.total_cards}</p>
                        <p className="text-[10px] text-slate-400">cards</p>
                        {hasOffer && (
                          <p className="text-[10px] font-medium text-slate-500 line-through">
                            {bdt(p.regular_price)}
                          </p>
                        )}
                        <p className="mt-0.5 text-xs font-semibold text-cyan-300">
                          {busyPkg === p._id ? "…" : bdt(p.price)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </>
      )}

      {tab === "cards" && (
        <>
          {unopened.length === 0 && (
            <div className="adnexa-glass-card rounded-2xl p-6 text-center text-sm text-slate-400">
              No cards yet.{" "}
              <button className="text-cyan-300" onClick={() => setTab("shop")}>
                Go to shop
              </button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            {unopened.map((c: any) => (
              <Link
                key={c._id}
                href={`/lucky-cards/${c._id}`}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 p-3"
                style={{
                  background: `linear-gradient(150deg, ${c.accent}33, #141a2e)`,
                }}
              >
                <span className="text-2xl">🍀</span>
                <p className="absolute bottom-8 left-3 text-sm font-bold">
                  {c.card_type}
                </p>
                <p className="absolute bottom-3 left-3 text-[10px] text-slate-400">
                  {c.short_code}
                </p>
                <span className="absolute bottom-3 right-3 rounded-md bg-white/10 px-1.5 py-0.5 text-[10px]">
                  Scratch
                </span>
              </Link>
            ))}
          </div>

          {opened.length > 0 && (
            <div className="space-y-1.5">
              <p className="mt-2 text-sm font-semibold text-slate-400">
                Opened cards
              </p>
              {opened.map((c: any) => (
                <div
                  key={c._id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm"
                >
                  <div>
                    <p className="font-medium">{c.card_type}</p>
                    <p className="text-[11px] text-slate-500">{c.short_code}</p>
                  </div>
                  <span
                    className={
                      c.win ? "font-bold text-green-400" : "text-slate-500"
                    }
                  >
                    {c.win ? `+ ${bdt(c.prize_amount)}` : "No win"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
