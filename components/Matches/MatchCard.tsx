import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MatchCard() {
  const router = useRouter();
  return (
    <div
      className="min-w-[320px] rounded-xl shadow-md border border-gray-200 mx-2 cursor-pointer"
      onClick={() => router.push("/stats")}
    >
      {/* Top Bar */}
      <div className="bg-blue-100 px-3 py-1 text-xs font-semibold flex justify-between">
        <span className="text-orange-600">STUMPS</span>
        <span className="text-gray-600">
          Starts 5:00 AM · Only Unofficial TEST · Brisbane
        </span>
      </div>

      {/* Match Content */}
      <div className="p-4 space-y-3">
        {/* Teams */}
        <div className="space-y-2">
          {/* Team 1 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {/* <Image
                                src={"https://flagcdn.com/w20/in.png"}
                                alt="India"
                                className="w-5 h-4"
                                width={10}
                                height={10}

                            /> */}
              <span className="font-semibold">INA-W</span>
              <span className="text-red-500 text-xs">●</span>
            </div>
            <div className="text-sm text-gray-700">
              <span className="text-xs">(73 ov)</span>{" "}
              <span className="font-bold">299 & 260/8</span>
            </div>
          </div>

          {/* Team 2 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {/* 
                            <Image
                                src={"https://flagcdn.com/w20/au.png"}
                                alt="Australia"
                                width={10}
                                height={10}

                            /> */}
              <span className="font-semibold">AUA-W</span>
            </div>
            <div className="text-sm font-bold text-gray-700">305</div>
          </div>
        </div>

        {/* Match Status */}
        <p className="text-xs text-gray-600">
          Day 3 - IND-A Women lead by{" "}
          <span className="font-semibold">254 runs</span>.
        </p>
      </div>
    </div>
  );
}
