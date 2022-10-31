import { Dispatch } from '@reduxjs/toolkit';
import Promise from 'bluebird';
import { formatOuterContainerData, setPortfolioImages } from './portfolioSlice';
import { GithubEntry, PortfolioJSONEntry } from './portfolioTypes';

type InputArr = (PortfolioJSONEntry | GithubEntry)[];

const handlePortraitContainerData = (inputArr: InputArr) =>
  inputArr.reduce(
    (
      total: (PortfolioJSONEntry | GithubEntry)[][],
      item: PortfolioJSONEntry | GithubEntry
    ) => {
      total.push([item]);
      return total;
    },
    []
  );

const handleLandscapeContainerData = (inputArr: InputArr) =>
  inputArr.reduce(
    (
      total: (PortfolioJSONEntry | GithubEntry)[][],
      item: PortfolioJSONEntry | GithubEntry,
      index: number
    ) => {
      if (index % 2 === 0) {
        total.push([item]);
      } else {
        total[total.length - 1].push(item);
      }
      return total;
    },
    []
  );

export const handleOuterContainerData = (
  inputArr: PortfolioJSONEntry[],
  dispatch: Dispatch
) => {
  dispatch(
    formatOuterContainerData([
      handlePortraitContainerData(inputArr),
      handleLandscapeContainerData(inputArr),
    ])
  );
};

export const handleNestedContainerData = (inputArr: GithubEntry[]) => {
  return [
    handlePortraitContainerData(inputArr),
    handleLandscapeContainerData(inputArr),
  ];
};

export const handleImageData = async (
  inputArr: PortfolioJSONEntry[][],
  dispatch: Dispatch
) => {
  const processedImages = await Promise.reduce(
    inputArr,
    async (total: any[], row) => {
      return [
        ...total,
        await Promise.mapSeries(row, async (imgData) => {
          return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => resolve({ ...imgData });
            img.onerror = () => {
              reject(new Error(`The ${imgData.title} image failed to load`));
            };
            img.src = imgData.imgUrl;
          });
        }),
      ];
    },
    []
  );
  dispatch(setPortfolioImages({ imgArr: processedImages }));
};
