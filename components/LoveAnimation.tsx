"use client";

import { useEffect, useRef } from "react";
import styles from "./LoveAnimation.module.css";

export default function LoveAnimation() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    let intervalId: any = null;
    let loveTl: any = null;

    const run = async () => {
      // @ts-ignore
      const mojsMod = await import("@mojs/core");
      // @ts-ignore
      const mojs = mojsMod.default ?? mojsMod;

      if (!mounted || !wrapRef.current) return;

      const root = wrapRef.current;
      const qs = (sel: string) => root.querySelector(sel) as any;

      const svgEl = qs("svg") as SVGSVGElement;
      const container = qs(".mo-container") as HTMLDivElement;

      // wait for layout (mobile-friendly)
      await new Promise(requestAnimationFrame);
      await new Promise(requestAnimationFrame);

      const el: any = {
        container,
        i: qs(".lttr--I"),
        l: qs(".lttr--L"),
        o: qs(".lttr--O"),
        v: qs(".lttr--V"),
        e: qs(".lttr--E"),
        y: qs(".lttr--Y"),
        o2: qs(".lttr--O2"),
        u: qs(".lttr--U"),
        lineLeft: qs(".line--left"),
        lineRight: qs(".line--rght"),
        colTxt: "#763c8c",
        colHeart: "#fa4843",
      };

      const restoreAll = new mojs.Tween({
        duration: 50,
        delay: 0,
        onStart: () => {
          [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach((n: any) => {
            n.style.opacity = 1;
          });
        },
      });


      // ---------- SVG transform helpers (viewBox units) ----------
      const setSvgX = (node: SVGElement, x: number) => {
        node.setAttribute("transform", `translate(${x} 0)`);
      };
      const resetSvg = (node: SVGElement) => {
        node.removeAttribute("transform");
      };
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      const piecewiseX = (
        node: SVGElement,
        segments: Array<{ t0: number; t1: number; x0: number; x1: number }>,
        opts: { duration: number; delay?: number; easing?: any }
      ) =>
        new mojs.Tween({
          duration: opts.duration,
          delay: opts.delay ?? 0,
          easing: opts.easing ?? "sin.inOut",
          onStart: () => setSvgX(node, segments[0]?.x0 ?? 0),
          onUpdate: (p: number) => {
            const seg =
              segments.find((s) => p >= s.t0 && p <= s.t1) ??
              (p < segments[0].t0 ? segments[0] : segments[segments.length - 1]);

            const tt = seg.t1 === seg.t0 ? 1 : (p - seg.t0) / (seg.t1 - seg.t0);
            setSvgX(node, lerp(seg.x0, seg.x1, Math.max(0, Math.min(1, tt))));
          },
        });

      // ---------- mojs overlay scaling (CSS px) ----------
      const BASE_W = 500;
      const getScale = () => {
        const w = svgEl.getBoundingClientRect().width || BASE_W;
        return w / BASE_W;
      };
      const S = (n: number) => n * getScale();

      // ---------- Heart shape for overlay ----------
      const easingHeart = mojs.easing.path(
        "M0,100C2.9,86.7,33.6-7.3,46-7.3s15.2,22.7,26,22.7S89,0,100,0"
      );

      class Heart extends mojs.CustomShape {
        getShape() {
          return '<path d="M50,88.9C25.5,78.2,0.5,54.4,3.8,31.1S41.3,1.8,50,29.9c8.7-28.2,42.8-22.2,46.2,1.2S74.5,78.2,50,88.9z"/>';
        }
        getLength() {
          return 200;
        }
      }
      mojs.addShape("heart", Heart);

      const crtBoom = (delay = 0, x = 0, rd = 46) => {
        const parent = el.container;

        const crcl = new mojs.Shape({
          shape: "circle",
          fill: "none",
          stroke: el.colTxt,
          strokeWidth: { [S(5)]: 0 },
          radius: { [S(rd)]: [S(rd + 20)] },
          easing: "quint.out",
          duration: 500 / 3,
          parent,
          delay,
          x: S(x),
        });

        const brst = new mojs.Burst({
          radius: { [S(rd + 15)]: S(110) },
          angle: "rand(60, 180)",
          count: 3,
          timeline: { delay },
          parent,
          x: S(x),
          children: {
            radius: [S(5), S(3), S(7)],
            fill: el.colTxt,
            scale: { 1: 0, easing: "quad.in" },
            pathScale: [0.8, null],
            degreeShift: ["rand(13, 60)", null],
            duration: 1000 / 3,
            easing: "quint.out",
          },
        });

        return [crcl, brst];
      };

      // ---------- Timeline ----------
      const crtLoveTl = () => {
        const move = 1000;
        const boom = 200;
        const easing = "sin.inOut";
        const easingBoom = "sin.in";
        const easingOut = "sin.out";
        const delta = 150;

        // Reset everything each loop
        const resetAll = new mojs.Tween({
          duration: 1,
          onStart: () => {
            [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach((n: any) => {
              n.style.opacity = 1;
              resetSvg(n);
            });
            resetSvg(el.lineLeft);
            resetSvg(el.lineRight);
          },
        });

        // Lines total duration (matches original chained durations)
        const lineTotal = move + (boom + move) + (boom + move) + 150 + 300 + 350; // 4200

        const lineLeftTween = piecewiseX(
          el.lineLeft,
          [
            { t0: 0.0, t1: move / lineTotal, x0: 0, x1: 52 },
            { t0: move / lineTotal, t1: (move + boom + move) / lineTotal, x0: 52, x1: 106 },
            {
              t0: (move + boom + move) / lineTotal,
              t1: (move + (boom + move) * 2) / lineTotal,
              x0: 106,
              x1: 166,
            },
            {
              t0: (move + (boom + move) * 2) / lineTotal,
              t1: (move + (boom + move) * 2 + 150) / lineTotal,
              x0: 166,
              x1: 176,
            },
            {
              t0: (move + (boom + move) * 2 + 150) / lineTotal,
              t1: (move + (boom + move) * 2 + 150 + 300) / lineTotal,
              x0: 176,
              x1: 176,
            },
            {
              t0: (move + (boom + move) * 2 + 150 + 300) / lineTotal,
              t1: 1.0,
              x0: 176,
              x1: 0,
            },
          ],
          { duration: lineTotal, easing }
        );

        const lineRightTween = piecewiseX(
          el.lineRight,
          [
            { t0: 0.0, t1: move / lineTotal, x0: 0, x1: -52 },
            { t0: move / lineTotal, t1: (move + boom + move) / lineTotal, x0: -52, x1: -106 },
            {
              t0: (move + boom + move) / lineTotal,
              t1: (move + (boom + move) * 2) / lineTotal,
              x0: -106,
              x1: -166,
            },
            {
              t0: (move + (boom + move) * 2) / lineTotal,
              t1: (move + (boom + move) * 2 + 150) / lineTotal,
              x0: -166,
              x1: -176,
            },
            {
              t0: (move + (boom + move) * 2 + 150) / lineTotal,
              t1: (move + (boom + move) * 2 + 150 + 300) / lineTotal,
              x0: -176,
              x1: -176,
            },
            {
              t0: (move + (boom + move) * 2 + 150 + 300) / lineTotal,
              t1: 1.0,
              x0: -176,
              x1: 0,
            },
          ],
          { duration: lineTotal, easing }
        );

        // Letter tweens
        const iTotal = move + boom + move + boom + move; // 3400
        const iTween = piecewiseX(
          el.i,
          [
            { t0: 0.0, t1: move / iTotal, x0: 0, x1: 34 },
            { t0: move / iTotal, t1: (move + boom) / iTotal, x0: 34, x1: 53 },
            { t0: (move + boom) / iTotal, t1: (move + boom + move) / iTotal, x0: 53, x1: 93 },
            {
              t0: (move + boom + move) / iTotal,
              t1: (move + boom + move + boom) / iTotal,
              x0: 93,
              x1: 123,
            },
            { t0: (move + boom + move + boom) / iTotal, t1: 1.0, x0: 123, x1: 153 },
          ],
          { duration: iTotal, easing }
        );

        const lTween = piecewiseX(el.l, [{ t0: 0, t1: 1, x0: 0, x1: 15 }], { duration: move, easing });
        const oTween = piecewiseX(el.o, [{ t0: 0, t1: 1, x0: 0, x1: 11 }], { duration: move, easing });
        const vTween = piecewiseX(el.v, [{ t0: 0, t1: 1, x0: 0, x1: 3 }], { duration: move, easing });
        const eTween = piecewiseX(el.e, [{ t0: 0, t1: 1, x0: 0, x1: -3 }], { duration: move, easing });

        const yTotal = move + boom + move; // 2200
        const yTween = piecewiseX(
          el.y,
          [
            { t0: 0.0, t1: move / yTotal, x0: 0, x1: -20 },
            { t0: move / yTotal, t1: (move + boom) / yTotal, x0: -20, x1: -53 },
            { t0: (move + boom) / yTotal, t1: 1.0, x0: -53, x1: -77 },
          ],
          { duration: yTotal, easing }
        );

        const o2Total = move + boom + move; // 2200
        const o2Tween = piecewiseX(
          el.o2,
          [
            { t0: 0.0, t1: move / o2Total, x0: 0, x1: -27 },
            { t0: move / o2Total, t1: (move + boom) / o2Total, x0: -27, x1: -54 },
            { t0: (move + boom) / o2Total, t1: 1.0, x0: -54, x1: -84 },
          ],
          { duration: o2Total, easing }
        );

        const uTotal = move + boom + move + boom + move; // 3400
        const uTween = piecewiseX(
          el.u,
          [
            { t0: 0.0, t1: move / uTotal, x0: 0, x1: -32 },
            { t0: move / uTotal, t1: (move + boom) / uTotal, x0: -32, x1: -53 },
            { t0: (move + boom) / uTotal, t1: (move + boom + move) / uTotal, x0: -53, x1: -89 },
            {
              t0: (move + boom + move) / uTotal,
              t1: (move + boom + move + boom) / uTotal,
              x0: -89,
              x1: -120,
            },
            { t0: (move + boom + move + boom) / uTotal, t1: 1.0, x0: -120, x1: -147 },
          ],
          { duration: uTotal, easing }
        );

        // Heart + booms (overlay, CSS px)
        const heart = new mojs.Shape({
          parent: el.container,
          shape: "heart",
          delay: move,
          fill: el.colHeart,
          x: S(-64),
          scale: { 0: 0.95, easing: easingHeart },
          duration: 500,
        })
          .then({
            x: { to: S(-62), easing },
            scale: { to: 0.65, easing },
            duration: boom + move - 500,
          })
          .then({
            duration: boom - 50,
            x: { to: S(-62 + 48) },
            scale: { to: 0.9 },
            easing: easingBoom,
          })
          .then({ duration: 125, scale: { to: 0.8 }, easing: easingOut })
          .then({ duration: 125, scale: { to: 0.85 }, easing: easingOut })
          .then({ duration: move - 200, scale: { to: 0.45 }, easing })
          .then({
            delay: -75,
            duration: 150,
            x: { to: 0 },
            scale: { to: 0.9 },
            easing: easingBoom,
          })
          .then({ duration: 125, scale: { to: 0.8 }, easing: easingOut })
          .then({ duration: 125, scale: { to: 0.85 }, easing: easingOut })
          .then({ duration: 125 })
          .then({ duration: 350, scale: { to: 0 }, easing: easingOut });

        return new mojs.Timeline().add([
          resetAll,

          // fades (same as your logic)
          new mojs.Tween({
            duration: move,
            onComplete: () => {
              [el.l, el.o, el.v, el.e].forEach((n: any) => (n.style.opacity = 0));
            },
          }),
          new mojs.Tween({
            duration: move * 2 + boom,
            onComplete: () => {
              [el.y, el.o2].forEach((n: any) => (n.style.opacity = 0));
            },
          }),
          new mojs.Tween({
            duration: move * 3 + boom * 2 - delta,
            onComplete: () => {
              el.i.style.opacity = 0;
            },
          }),
          new mojs.Tween({
            duration: move * 3 + boom * 2,
            onComplete: () => {
              el.u.style.opacity = 0;
            },
          }),

          lineLeftTween,
          lineRightTween,

          iTween,
          lTween,
          oTween,
          vTween,
          eTween,
          yTween,
          o2Tween,
          uTween,

          restoreAll,

          heart,
          ...crtBoom(move, -64, 46),
          ...crtBoom(move * 2 + boom, 18, 34),
          ...crtBoom(move * 3 + boom * 2 - delta, -64, 34),
          ...crtBoom(move * 3 + boom * 2, 45, 34),
        ]);
      };

      loveTl = crtLoveTl().play();

      intervalId = setInterval(() => {
        loveTl?.replay?.();
      }, 4300);

      const onResize = () => {
        if (!mounted) return;
        try {
          loveTl?.stop?.();
        } catch {}
        loveTl = crtLoveTl().play();
      };

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    };

    let cleanupResize: any = null;

    run()
      .then((cleanup) => (cleanupResize = cleanup))
      .catch(console.error);

    return () => {
      mounted = false;
      if (intervalId) clearInterval(intervalId);
      try {
        loveTl?.stop?.();
      } catch {}
      if (cleanupResize) cleanupResize();
    };
  }, []);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <svg
        className={styles.svg}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <line className={`${styles.line} line line--left`} x1="10" y1="17" x2="10" y2="183" />
        <line className={`${styles.line} line line--rght`} x1="490" y1="17" x2="490" y2="183" />
        <g>
          <path className={`${styles.lttr} lttr lttr--I`} d="M42.2,73.9h11.4v52.1H42.2V73.9z" />
          <path className={`${styles.lttr} lttr lttr--L`} d="M85.1,73.9h11.4v42.1h22.8v10H85.1V73.9z" />
          <path
            className={`${styles.lttr} lttr lttr--O`}
            d="M123.9,100c0-15.2,11.7-26.9,27.2-26.9s27.2,11.7,27.2,26.9s-11.7,26.9-27.2,26.9S123.9,115.2,123.9,100zM166.9,100c0-9.2-6.8-16.5-15.8-16.5c-9,0-15.8,7.3-15.8,16.5s6.8,16.5,15.8,16.5C160.1,116.5,166.9,109.2,166.9,100z"
          />
          <path
            className={`${styles.lttr} lttr lttr--V`}
            d="M180.7,73.9H193l8.4,22.9c1.7,4.7,3.5,9.5,5,14.2h0.1c1.7-4.8,3.4-9.4,5.2-14.3l8.6-22.8h11.7l-19.9,52.1h-11.5L180.7,73.9z"
          />
          <path className={`${styles.lttr} lttr lttr--E`} d="M239.1,73.9h32.2v10h-20.7v10.2h17.9v9.5h-17.9v12.4H272v10h-33V73.9z" />
          <path
            className={`${styles.lttr} lttr lttr--Y`}
            d="M315.8,102.5l-20.1-28.6H309l6.3,9.4c2,3,4.2,6.4,6.3,9.6h0.1c2-3.2,4.1-6.4,6.3-9.6l6.3-9.4h12.9l-19.9,28.5v23.6h-11.4V102.5z"
          />
          <path
            className={`${styles.lttr} lttr lttr--O2`}
            d="M348.8,100c0-15.2,11.7-26.9,27.2-26.9c15.5,0,27.2,11.7,27.2,26.9s-11.7,26.9-27.2,26.9C360.5,126.9,348.8,115.2,348.8,100z M391.8,100c0-9.2-6.8-16.5-15.8-16.5c-9,0-15.8,7.3-15.8,16.5s6.8,16.5,15.8,16.5C385,116.5,391.8,109.2,391.8,100z"
          />
          <path
            className={`${styles.lttr} lttr lttr--U`}
            d="M412.4,101.1V73.9h11.4v26.7c0,10.9,2.4,15.9,11.5,15.9c8.4,0,11.4-4.6,11.4-15.8V73.9h11v26.9c0,7.8-1.1,13.5-4,17.7c-3.7,5.3-10.4,8.4-18.7,8.4c-8.4,0-15.1-3.1-18.8-8.5C413.4,114.2,412.4,108.5,412.4,101.1z"
          />
        </g>
      </svg>

      <div className={`${styles.mo} mo-container`} />
    </div>
  );
}
