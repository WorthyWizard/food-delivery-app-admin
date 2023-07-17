import { useLayoutEffect, useState } from "react";

import type { HeightHookProps } from "./types";

export const useDomHeight = (props: HeightHookProps): number => {
  const { substractFrom, initialHeight } = props;

  const [reducedHeight, setReducedHeight] = useState<number>(initialHeight);

  useLayoutEffect(() => {
    if (initialHeight > 0) {
      const height = substractFrom.reduce((height, className) => {
        const element = document.querySelector(`.${className}`)!;
        const elementHeight = element.getBoundingClientRect().height;
        height -= elementHeight;
        return height;
      }, initialHeight);

      setReducedHeight(height);
    }
  }, [substractFrom, initialHeight]);

  return reducedHeight;
};
