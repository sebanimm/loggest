interface MultiProviderProps {
  providers: React.ComponentType<{ children: React.ReactNode }>[];
  children: React.ReactNode;
}

export function MultiProvider({ children, providers }: MultiProviderProps) {
  return (
    <>
      {providers.reduceRight(
        (accumulatedProviders, Provider) => (
          <Provider>{accumulatedProviders}</Provider>
        ),
        children,
      )}
    </>
  );
}
