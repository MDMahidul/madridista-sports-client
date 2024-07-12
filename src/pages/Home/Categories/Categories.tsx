import CategoryCard from '@/components/Cards/CategoryCard';
import Container from '@/components/Container/Container';
import SectionHeader from '@/components/Headers/SectionsHeader';
import React from 'react';

const Categories = () => {
    return (
      <div className="md-5 md:mb-10">
        <SectionHeader heading="Products Categories" />
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 md:gap-y-10 ">
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
          </div>
        </Container>
      </div>
    );
};

export default Categories;