import Image from "next/image";

export function FishersSection() {
  return (
    <section className="fishers" id="fishers">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">لأهل البحر</span>
          <h2 data-words>من جدة إلى جازان، ومن القطيف إلى أملج</h2>
          <p>
            قوارب الصيد على سواحل المملكة تشتغل بظروف قاسية: ملوحة عالية، حرارة،
            ومواسم طويلة. توهاتسو 60 صُمم لهذه الظروف بالذات.
          </p>
        </div>
        <div className="fishers-grid">
          <div className="fisher-shot fs-1">
            <div className="slot">
              <Image
                src="/images/fisher-1.jpg"
                alt="قارب صيد مع محرك توهاتسو"
                fill
                sizes="(max-width: 1020px) 92vw, 500px"
              />
            </div>
          </div>
          <div className="fisher-shot fs-2">
            <div className="slot">
              <Image
                src="/images/fisher-2.jpg"
                alt="طلعة فجر بحرية بمحرك توهاتسو"
                fill
                sizes="(max-width: 1020px) 92vw, 400px"
                style={{ objectPosition: "70% 50%" }}
              />
            </div>
          </div>
          <div className="fisher-shot fs-3">
            <div className="slot">
              <Image
                src="/images/fisher-3.jpg"
                alt="محرك توهاتسو 60 عن قرب"
                fill
                sizes="(max-width: 1020px) 92vw, 300px"
              />
            </div>
          </div>
        </div>
        <div className="fishers-quote" data-reveal>
          <blockquote>
            المحرك اللي يطلع معك الفجر، <span className="accent">ويرجّعك قبل المغرب.</span>
          </blockquote>
          <cite>توهاتسو 60 — لكل صياد على سواحل المملكة</cite>
        </div>
      </div>
    </section>
  );
}
