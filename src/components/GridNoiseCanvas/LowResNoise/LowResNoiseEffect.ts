import { Effect, BlendFunction } from "postprocessing";

import fragmentShader from "./fragment.glsl";
import { Uniform, WebGLRenderTarget, WebGLRenderer } from "three";

export interface LowResNoiseEffectProps {
  size?: number;
  opacity?: number;
  aspectRatio?: number;
  blendFunction?: BlendFunction;
}

export class LowResNoiseEffect extends Effect {
  constructor(props: LowResNoiseEffectProps) {
    super('LowResNoiseEffect', fragmentShader, {
      uniforms: new Map([
        ['uTime', new Uniform(0)],
        ['uNoiseSize', new Uniform(props.size || 1)],
        ['uNoiseOpacity', new Uniform(props.opacity || 1)],
        ['uAspectRatio', new Uniform(props.aspectRatio || 1)],
      ]),
      blendFunction: props.blendFunction || BlendFunction.DARKEN
    });
  }

  update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, deltaTime?: number | undefined): void {
    this.uniforms.get('uTime')!.value += deltaTime;
  }
}
