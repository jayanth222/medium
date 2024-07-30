export const Quote = () => {
  return (
    <div className="flex h-screen flex-1 flex-col items-center justify-center gap-5 bg-green-100">
      <div className="flex flex-col gap-5">
        <div className="max-w-lg text-2xl font-bold">
          "The customer service I received was exceptional. The support team
          went above and beyond to address my concerns"
        </div>
        <div>
          <div className="max-w-md text-lg font-bold">Julies Winfield</div>
          <div className="max-w-md text-lg text-slate-500">CEO, Acme Inc</div>
        </div>
      </div>
    </div>
  );
};
