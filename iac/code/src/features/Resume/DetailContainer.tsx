import PublicDisplayContainer from './PublicDisplayContainer';

interface DetailContainerProps {
  detail: { title: string };
  detailIndex: number;
  hoveredIndex: number;
  prevTitle: string;
  ind: boolean;
}
const DetailContainer = ({
  detail,
  detailIndex,
  hoveredIndex,
  prevTitle,
  ind,
}: DetailContainerProps) => {
  return (
    <div className="resumeParentContainer">
      <div className="">
        <div className="publicColumnContainerDetail">
          <PublicDisplayContainer
            key={detailIndex}
            displayItem={detail?.title || ''}
            breadth={hoveredIndex}
            depth={1}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailContainer;
