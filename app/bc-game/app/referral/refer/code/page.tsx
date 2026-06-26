export default function ReferralCode() {
  return (
    <div className="bg-layer2 font-semibold">
      <div className="items-center justify-between rounded-lg bg-layer4 p-4 sm:flex">
        <div className="mb-4 flex flex-1 items-center">
          <div className="flex-1 text-secondary">
            <div>Referral Code Created</div>
            <div className="text-2xl font-extrabold">
              <span className="text-primary">1</span>
              /20
            </div>
          </div>
          <div className="flex-1 text-secondary">
            <div>Friends</div>
            <div className="text-2xl font-extrabold text-primary">
              <span>0</span>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center border-third sm:h-20 sm:w-60 sm:border-l sm:pl-10">
          <button
            className="button button-brand button-m h-10 w-full"
            type="button"
          >
            Create Code
          </button>
        </div>
      </div>
      <section className="relative mt-4 rounded-xl bg-layer4 pt-2">
        <div className="p-4">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-175">
              <thead>
                <tr className="border-b border-solid border-b-third">
                  <th className="px-3 py-2 align-middle text-xs font-semibold text-secondary text-left whitespace-nowrap">
                    Name
                  </th>
                  <th className="px-3 py-2 align-middle text-xs font-semibold text-secondary text-center whitespace-nowrap">
                    Code
                  </th>
                  <th className="px-3 py-2 align-middle text-xs font-semibold text-secondary text-center whitespace-nowrap">
                    Link
                  </th>
                  <th className="px-3 py-2 align-middle text-xs font-semibold text-secondary text-center whitespace-nowrap">
                    Commission Rate
                  </th>
                  <th className="px-3 py-2 align-middle text-xs font-semibold text-secondary text-center whitespace-nowrap">
                    Date Created
                  </th>
                  <th className="px-3 py-2 align-middle text-xs font-semibold text-secondary text-right whitespace-nowrap">
                    Referrals
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-solid border-b-third hover:bg-white/5 transition-colors">
                  <td className="px-3 py-4 align-middle text-left whitespace-nowrap">
                    <span className="font-semibold text-secondary">--</span>
                  </td>
                  <td className="px-3 py-4 align-middle text-center">
                    <div className="flex items-center justify-center gap-1 font-semibold">
                      <span className="text-sm">494swhc0j</span>
                      <button
                        className="hover:opacity-70 active:scale-95 transition-all"
                        type="button"
                      >
                        {/* Icon SVG dito... */}
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-4 align-middle text-center">
                    <div className="flex items-center justify-center gap-1">
                      {/* Truncated link para hindi masyadong mahaba sa layout */}
                      <span className="font-semibold text-primary max-w-37.5 truncate block text-sm">
                        https://bc.game/i-494swhc0j-n/
                      </span>
                      <button className="hover:opacity-70" type="button">
                        {/* Icon SVG dito... */}
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-4 align-middle text-center">
                    <span className="font-semibold text-primary text-sm">
                      25%
                    </span>
                  </td>
                  <td className="px-3 py-4 align-middle text-center whitespace-nowrap">
                    <span className="font-semibold text-secondary text-xs">
                      2026-01-06 14:49:05
                    </span>
                  </td>
                  <td className="px-3 py-4 align-middle text-right">
                    <div className="flex items-center justify-end gap-2 group cursor-pointer">
                      <span className="font-semibold text-primary">0</span>
                      <div className="icon size-4 rotate-180 fill-secondary group-hover:translate-x-1 transition-transform">
                        {/* Arrow SVG dito... */}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
