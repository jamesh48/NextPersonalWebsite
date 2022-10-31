export type GithubEntry = {
  title: string;
  link: string;
};

export interface PortfolioJSONCSSStyle {
  backgroundColor: string;
  color: string;
}

export interface PortfolioJSONEntry {
  title: string;
  cssStyles: PortfolioJSONCSSStyle;
  imgUrl: string;
  github: GithubEntry[];
}
