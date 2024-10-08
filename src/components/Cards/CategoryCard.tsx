import { Link } from 'react-router-dom';

interface Sport {
  id: number;
  name: string;
  image: string;
}

interface CategoryCardProps {
  sport: Sport;
}

const CategoryCard = ({ sport }: CategoryCardProps) => {
  const { name, image } = sport;
  return (
    <div>
      <Link to={`/all-products?category=${name}`}>
        <div className="relative max-w-96 h-96 bg-cover bg-center bg-no-repeat hover:shadow-xl transition-transform transform  hover:bg-black hover:bg-opacity-70 group rounded-xl">
          <div
            className="absolute inset-0 w-full h-full rounded-xl bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
          <div
            className={`absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent
              } transition-transform group-hover:opacity-100 rounded-xl`}
          >
            <h2 className="card_effect text-white text-2xl md:text-3xl font-bold  translate-y-2 group-hover:-translate-y-4 capitalize">
              {name}
            </h2>
            <Link
              to={`/product`}
              className="card_effect text-white hover:text-secondary font-semibold mt-2  translate-y-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-4"
            >
              Explore More
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;