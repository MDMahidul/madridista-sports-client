import Container from '@/components/Container/Container';

const LoadingError = () => {
    return (
      <Container>
        <div className="pt-12 md:pt-24">
          <p className="mt-20 py-40 text-center text-xl font-semibold text-primary">
            Something went wrong!
          </p>
        </div>
      </Container>
    );
};

export default LoadingError;