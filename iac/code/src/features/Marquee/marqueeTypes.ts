export interface MarqueeContainerProps {
  smileCallback: () => void;
}

export interface MarqueeInnerProps {
  smileImage: { url: string };
  paragraphOne: string;
  paragraphTwo: string;
}

export interface SmileImageProps {
  loaded: boolean;
  url: string;
  title: string;
}
