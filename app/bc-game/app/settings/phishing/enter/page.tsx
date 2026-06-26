export default function PhishingEnterPage() {
  return (
    <>
      <div className="mt-4 flex w-full flex-col items-center">
        <img
          className="h-48"
          src="https://bc.game/modules/account2/assets/work_w-B_RsTfDn.png"
        />
        <div className="mt-8 w-full font-semibold text-secondary">
          You can create your own anti-phishing code to appear in official
          BC.GAME emails and SMS messages. This feature helps you verify the
          authenticity of communications from BC.GAME
        </div>
      </div>
      <button
        className="button button-brand button-m mt-4 w-full"
        type="button"
      >
        Create
      </button>
    </>
  );
}
