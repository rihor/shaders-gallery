"use client";
import { forwardRef, useMemo } from "react";
import { LowResNoiseEffect, LowResNoiseEffectProps as Props } from "./LowResNoiseEffect";

const LowResNoiseComponent: React.ForwardRefRenderFunction<unknown, Props> = (props, ref) => {
  const effect = useMemo(() => new LowResNoiseEffect(props), [props])

  return <primitive ref={ref} object={effect} dispose={null} />
}

export const LowResNoise = forwardRef(LowResNoiseComponent);
