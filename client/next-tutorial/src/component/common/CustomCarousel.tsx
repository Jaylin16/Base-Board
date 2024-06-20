import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./CustomCarouselArrow";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { css } from "@emotion/react";

type PropType = {
  slides: any;
  options?: EmblaOptionsType;
};

const CustomCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section css={embla}>
      <div css={embla__viewport} ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item: any, _: any) => (
            <div className="embla__slide" key={item.no}>
              <Image
                src={item.src}
                sizes="100vw"
                style={{
                  objectFit: "contain",
                }}
                fill
                alt="carouselImage"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default CustomCarousel;

const embla = css`
  position: relative;
  width: 100%;

  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    height: auto;
    touch-action: pan-y pinch-zoom;
  }

  .embla__slide {
    flex: 0 0 100%;
    position: relative;
    width: 100%;
    padding-bottom: 29.7%;
  }

  .embla__controls {
    display: flex;
    justify-content: space-between;
    width: 100%;

    position: absolute;

    transform: translateY(-50%);
    top: 50%;
    left: 0;
  }

  .embla__buttons {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }

  .embla__button {
    width: 3rem;
    height: 3rem;
    color: #ffffff;
    z-index: 1;

    background: rgba(0, 0, 0, 0.28);
    border-radius: 50%;

    cursor: pointer;
  }

  .embla__button:disabled {
    color: var(--detail-high-contrast);
  }

  .embla__button__svg {
    width: 35%;
    height: 35%;
  }
`;

const embla__viewport = css`
  overflow: hidden;
`;
