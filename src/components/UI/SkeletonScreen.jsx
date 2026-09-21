export const SkeletonScreen = () => (
  <div
    className="w-full h-full flex flex-col"
    style={{ minHeight: "460px", background: "#f5f5ff" }}
  >
    <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
      <div className="w-24 h-5 rounded-lg bg-indigo-100" />
      <div className="flex gap-1.5">
        {[60, 50, 70].map((w, i) => (
          <div key={i} className="h-5 rounded-full bg-gray-100" style={{ width: w }} />
        ))}
      </div>
    </div>
    <div className="px-5 py-5 flex flex-col gap-3">
      <div className="w-44 h-7 rounded-xl bg-indigo-100 mb-1" />
      {[75, 90, 60, 82, 68, 78].map((w, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-200 shrink-0" />
          <div className="h-3.5 rounded-lg bg-gray-100" style={{ width: `${w}%` }} />
          <div
            className="w-20 h-5 rounded-full ml-auto shrink-0"
            style={{
              background:
                i % 3 === 0 ? "#dcfce7" : i % 3 === 1 ? "#fef9c3" : "#fee2e2",
            }}
          />
        </div>
      ))}
    </div>
  </div>
);