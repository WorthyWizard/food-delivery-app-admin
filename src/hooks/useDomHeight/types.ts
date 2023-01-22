export interface HeightHookProps {
  /** The classNames of the DOM elements which height will be substracted from the initial height */
  substractFrom: string[];

  /** Any number that represents some kind of height value. For example, window.height */
  initialHeight: number;
}
