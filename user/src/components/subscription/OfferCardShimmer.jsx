const OfferCardShimmer = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#eef0f2] bg-white p-5 animate-pulse">
      {/* top glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#dcfce7]" />
      <div className="flex items-start justify-between gap-4">
        {/* left */}
        <div className="flex-1 min-w-0">
          {/* badge */}
          <div className="mb-3 h-6 w-28 rounded-full bg-[#f3f4f6]" />
          {/* title */}
          <div className="h-6 w-44 rounded-xl bg-[#f3f4f6]" />
          {/* discount */}
          <div className="mt-3 h-4 w-24 rounded-lg bg-[#f3f4f6]" />
          {/* minimum */}
          <div className="mt-3 h-3 w-40 rounded-lg bg-[#f3f4f6]" />
        </div>
      </div>
      {/* button */}
      <div className="mt-8 h-11 w-[90px] rounded-2xl bg-[#f3f4f6]" />
    </div>
  )
}

export default OfferCardShimmer