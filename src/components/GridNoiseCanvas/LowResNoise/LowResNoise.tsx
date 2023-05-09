"use client";
import { forwardRef } from "react";
import { LowResNoiseEffect, LowResNoiseEffectProps as Props } from "./LowResNoiseEffect";

const LowResNoiseComponent: React.ForwardRefRenderFunction<unknown, Props> = (props, ref) => {
  const effect = new LowResNoiseEffect(props);

  return <primitive ref={ref} object={effect} />
}

export const LowResNoise = forwardRef(LowResNoiseComponent);
