import Image from "next/image";

export default function Home() {
  return (
    <div className='main-container'>
      <div className="flip-card-container" style={{ '--hue': 220 } as React.CSSProperties}>
        <div className="flip-card">
          <div className="card-front">
            <div className="card-front">
              <figure>
                <Image src={"/Orgil.JPG"} alt={"Orgil"} width={400} height={100} />
                <figcaption>Orgil</figcaption>
              </figure>
            </div>

          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
            </figure>
            <div className="design-container">
              <span>
                <span className="label">First impression:</span>
                <span className="text">Campaign-ныхаа communication зураг авалтанд оруулж болхым байна даа</span>
              </span>

              <span>
                <span className="label">One word:</span>
                <span className="text">Хичээл зүтгэл</span>
              </span>

              <span>
                <span className="label">Most memorable:</span>
                <span className="text">Сайхан ууж л байсандааа хха</span>
              </span>

              <span>
                <span className="label">Words for you:</span>
                <span className="text">Сурлага, ажилд нь амжилт</span>
              </span>
            </div>

          </div>
        </div>
      </div>

      <div className="flip-card-container" style={{ '--hue': 220 } as React.CSSProperties}>
        <div className="flip-card">
          <div className="card-front">
            <div className="card-front">
              <figure>
                <Image src={"/Javzaa.JPG"} alt={"Javzaa"} width={380} height={100} />
                <figcaption>Javzaa</figcaption>
              </figure>
            </div>

          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
            </figure>
            <div className="design-container">
              <span>
                <span className="label">Words for you:</span>
                <span className="text">{"Neelttei, huurhun, egduutei ohin shuu. Biy holdson ch setgel holdoh bishdee ooy. Ajild n amjilttt <3"}</span>
              </span>
            </div>

          </div>
        </div>
      </div>


      <div className="flip-card-container" style={{ '--hue': 220 } as React.CSSProperties}>
        <div className="flip-card">
          <div className="card-front">
            <div className="card-front">
              <figure>
                <Image src={"/Tseku.JPG"} alt={"Tseku"} width={450} height={100} />
                <figcaption>Tseku</figcaption>
              </figure>
            </div>

          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
            </figure>
            <div className="design-container">
              <span>
                <span className="label">First impression:</span>
                <span className="text">Нүдний доор нь харлачихсан их л ядардаг байх даа гэж бодсон.</span>
              </span>

              <span>
                <span className="label">One word:</span>
                <span className="text">Vibe</span>
              </span>

              <span>
                <span className="label">Most memorable:</span>
                <span className="text">Энд бичээд дэмий байх өөрт нь хэлье.</span>
              </span>

              <span>
                <span className="label">Words for you:</span>
                <span className="text">Хаана байх нь хамаагүй өөрийнхөөрөө инээд хөөр авчирж хөгжилтэй байдгаараа байгаасай гэж хүсч байна. </span>
              </span>
            </div>

          </div>
        </div>
      </div>


      <div className="flip-card-container" style={{ '--hue': 220 } as React.CSSProperties}>
        <div className="flip-card">
          <div className="card-front">
            <div className="card-front">
              <figure>
                <Image src={"/Bilguun.JPG"} alt={"Bilguun"} width={400} height={100} />
                <figcaption>Bilguun</figcaption>
              </figure>
            </div>

          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
            </figure>
            <div className="design-container">
              <span>
                <span className="label">First impression:</span>
                <span className="text">Нэг чөлөөт хувцаслалтай Pony Tail-тэй охин явж байхаар нь юу хийдэг юм бол гэж бодсон</span>
              </span>

              <span>
                <span className="label">One word:</span>
                <span className="text">Energetic</span>
              </span>

              <span>
                <span className="label">Most memorable:</span>
                <span className="text">тэр нэгэн Караоке л байх</span>
              </span>

              <span>
                <span className="label">Words for you:</span>
                <span className="text">Нойр хоолтой байхад болно доооо</span>
              </span>
            </div>

          </div>
        </div>
      </div>

      <div className="flip-card-container" style={{ '--hue': 220 } as React.CSSProperties}>
        <div className="flip-card">
          <div className="card-front">
            <div className="card-front">
              <figure>
                <Image src={"/Munkhjin.JPG"} alt={"Munkhjin"} width={400} height={100} />
                <figcaption>Munkhjin</figcaption>
              </figure>
            </div>

          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
            </figure>
            <div className="design-container">
              <span>
                <span className="label">First impression:</span>
                <span className="text">Яасан гоё арьстай охин бээээ л гэж бодсон дооо</span>
              </span>

              <span>
                <span className="label">One word:</span>
                <span className="text">cutie pie</span>
              </span>

              <span>
                <span className="label">Words for you:</span>
                <span className="text">Амжилт хүсье хөөрхнөө</span>
              </span>
            </div>

          </div>
        </div>
      </div>

      <div className="flip-card-container" style={{ '--hue': 220 } as React.CSSProperties}>
        <div className="flip-card">
          <div className="card-front">
            <div className="card-front">
              <figure>
                <Image src={"/Tsatsaa.JPG"} alt={"Tsatsaa"} width={350} height={100} />
                <figcaption>Tsatsaa</figcaption>
              </figure>
            </div>

          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
            </figure>
            <div className="design-container">
              <span>
                <span className="label">First impression:</span>
                <span className="text">Урсгал ус шиг намирсан сайхан охин байсааа, нээрээ</span>
              </span>

              <span>
                <span className="label">One word:</span>
                <span className="text">DWH дагина</span>
              </span>

              <span>
                <span className="label">Most memorable:</span>
                <span className="text">Хоолоо гоё иддэг хаха. Хамт уусан идсэнээ л ярих гээд байхын </span>
              </span>

              <span>
                <span className="label">Words for you:</span>
                <span className="text">Ажил дээрээ чадахгүй мэдэхгүй байгаа зүйлээ судлаад, сонирхоод бусдаас асууж байгаад учрыг нь олдог нь ер нь залуу мэргэжилтнүүдэд байх хамгийн сайн чанар шүү. Энэ хэвээрээ сониуч хичээнгүй байгаарай </span>
              </span>
            </div>

          </div>
        </div>
      </div>

      <div className="flip-card-container" style={{ '--hue': 220 } as React.CSSProperties}>
        <div className="flip-card">
          <div className="card-front">
            <div className="card-front">
              <figure>
                <Image src={"/Buyka.JPG"} alt={"Buyka"} width={400} height={100} />
                <figcaption>Buyka</figcaption>
              </figure>
            </div>

          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
            </figure>
            <div className="design-container">
              <span>
                <span className="label">First impression:</span>
                <span className="text">Cute охин бэ ингэж бодсоон</span>
              </span>

              <span>
                <span className="label">One word:</span>
                <span className="text">Эелдэг</span>
              </span>

              <span>
                <span className="label">Words for you:</span>
                <span className="text">Амжилт эрүүл энхийг хүсье эээ :))</span>
              </span>
            </div>

          </div>
        </div>
      </div>


      <div className="flip-card-container" style={{ '--hue': 220 } as React.CSSProperties}>
        <div className="flip-card">
          <div className="card-front">
            <div className="card-front">
              <figure>
                <Image src={"/Jak.JPG"} alt={"Jak"} width={400} height={100} />
                <figcaption>Jak</figcaption>
              </figure>
            </div>

          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
            </figure>
            <div className="design-container">
              <span>
                <span className="label">First impression:</span>
                <span className="text">Yg mnii type</span>
              </span>

              <span>
                <span className="label">One word:</span>
                <span className="text">Usan tsenher ungu</span>
              </span>

              <span>
                <span className="label">Most memorable:</span>
                <span className="text">{"2-uulahnaa soju uugaad karaokedej bsn uy "}</span>
              </span>

              <span>
                <span className="label">Words for you:</span>
                <span className="text">Direct helne.</span>
              </span>
            </div>

          </div>
        </div>
      </div>


      <div className="flip-card-container" style={{ '--hue': 220 } as React.CSSProperties}>
        <div className="flip-card">
          <div className="card-front">
            <div className="card-front">
              <figure>
                <Image src={"/Bat.JPG"} alt={"Bat-orgil"} width={400} height={100} />
                <figcaption>Bat-orgil</figcaption>
              </figure>
            </div>

          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
            </figure>
            <div className="design-container">
              <span>
                <span className="label">First impression:</span>
                <span className="text">DWH дээр 1 охин орж ирсэн байна.</span>
              </span>

              <span>
                <span className="label">Most memorable:</span>
                <span className="text">{"Мөч бүр дурсамжтай."}</span>
              </span>

              <span>
                <span className="label">Words for you:</span>
                <span className="text">Амжилт</span>
              </span>
            </div>

          </div>
        </div>
      </div>

      <div className="flip-card-container" style={{ '--hue': 220 } as React.CSSProperties}>
        <div className="flip-card">
          <div className="card-front">
            <div className="card-front">
              <figure>
                <Image src={"/Zuulnuu.JPG"} alt={"Zuulnuu"} width={350} height={100} />
                <figcaption>Zuulnuu</figcaption>
              </figure>
            </div>

          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
            </figure>
            <div className="design-container">
              <span>
                <span className="label">First impression:</span>
                <span className="text">Beautiful</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flip-card-container" style={{ '--hue': 220 } as React.CSSProperties}>
        <div className="flip-card">
          <div className="card-front">
            <div className="card-front">
              <figure>
                <Image src={"/Ariuka.JPG"} alt={"Ariuka"} width={400} height={100} />
                <figcaption>Ariuka</figcaption>
              </figure>
            </div>

          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
            </figure>
            <div className="design-container">
              <span>
                <span className="label">First impression:</span>
                <span className="text">Ааан иийм хүн орж ирж байгаа юм уу гэж харсан даа</span>
              </span>

              <span>
                <span className="label">One word:</span>
                <span className="text">cute</span>
              </span>

              <span>
                <span className="label">Most memorable:</span>
                <span className="text">Хамт байхад дандаа л дурсамж үлддэг дээ</span>
              </span>

              <span>
                <span className="label">Words for you:</span>
                <span className="text">үнэхээр хүүхдээрээ цагаахан, хөөрхөн шүү</span>
              </span>
            </div>

          </div>
        </div>
      </div>

      <div className="flip-card-container" style={{ '--hue': 220 } as React.CSSProperties}>
        <div className="flip-card">
          <div className="card-front">
            <div className="card-front">
              <figure>
                <Image src={"/Janchiv.JPG"} alt={"Janchiv"} width={400} height={100} />
                <figcaption>Janchiv</figcaption>
              </figure>
            </div>

          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
            </figure>
            <div className="design-container">
              <span>
                <span className="label">First impression:</span>
                <span className="text">Central-н гадаа таараад ямар хөөрхөн охинбэ гэж бодож байсан чинь манай газарт шинээр орсон охин байсан</span>
              </span>
              <span>
                <span className="label">Words for you:</span>
                <span className="text">Ажилд нь амжилт хүсье , дандаа инээж явдаг хөөрхөн  охин шүү</span>
              </span>
            </div>

          </div>
        </div>
      </div>

      <div className="flip-card-container" style={{ '--hue': 220 } as React.CSSProperties}>
        <div className="flip-card">
          <div className="card-front">
            <div className="card-front">
              <figure>
                <Image src={"/Sumiya.JPG"} alt={"Orgil"} width={400} height={100} />
                <figcaption>Sumiya</figcaption>
              </figure>
            </div>

          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
            </figure>
            <div className="design-container">
              <span>
                <span className="label">First impression:</span>
                <span className="text">Сэргэлэн охин байна даа </span>
              </span>

              <span>
                <span className="label">One word:</span>
                <span className="text">Сэргэлэн</span>
              </span>

              <span>
                <span className="label">Most memorable:</span>
                <span className="text">Хамт нэг хэлтэст ажилласан өдөр бүр л хөгжилтэй байсандаа.</span>
              </span>

              <span>
                <span className="label">Words for you:</span>
                <span className="text">Амжилтх10000</span>
              </span>
            </div>

          </div>
        </div>
      </div>

      <div className="flip-card-container" style={{ '--hue': 220 } as React.CSSProperties}>
        <div className="flip-card">
          <div className="card-front">
            <div className="card-front">
              <figure>
                <Image src={"/Javka.JPG"} alt={"Javka"} width={350} height={100} />
                <figcaption>Javka</figcaption>
              </figure>
            </div>

          </div>

          <div className="card-back">
            <figure>
              <div className="img-bg"></div>
            </figure>
            <div className="design-container">
              <span>
                <span className="label">First impression:</span>
                <span className="text">Хөөрхөн охин байна :))</span>
              </span>

              <span>
                <span className="label">One word:</span>
                <span className="text">Crush</span>
              </span>

              <span>
                <span className="label">Most memorable:</span>
                <span className="text">Зөндөө байна өө</span>
              </span>

              <span>
                <span className="label">Words for you:</span>
                <span className="text">Karaoke д уулзацгаая</span>
              </span>
            </div>

          </div>
        </div>
      </div>



    </div>
  );
}
