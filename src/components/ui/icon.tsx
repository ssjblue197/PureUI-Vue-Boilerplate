
import { useEffect, useState } from 'react';
import {
  getRawIcon
} from '@/lib/icon'

export interface IIconProps {
  name: string;
  //@ts-ignore
  [key: string]: any;
}

const Icon = ({ name, ...attrs }: IIconProps) => {
  let parser: DOMParser;
  // Get the SVG content based on the provided icon name
  const [rawIcon, setRawIcon] = useState<string | TrustedHTML | null>(null);

  const getTextHTML = (svgElement: SVGSVGElement) => {
    const tempContainer = document.createElement('div');
    // Append the SVG element to the container
    tempContainer.appendChild(svgElement.cloneNode(true));
    return tempContainer.innerHTML;
  }

  const loadRawData = async (name: string) => {
    try {
      const data = await getRawIcon(name);

      if (data) {
        const div = document.createElement('div');
        div.innerHTML = data;

        const svg = div.firstElementChild;
        if (svg?.tagName?.toLowerCase() !== 'svg') return;

        if (!parser) parser = new DOMParser();
        const doc = parser.parseFromString(svg.outerHTML, 'text/html');
        const svgEl = doc.body.querySelector('svg');

        for (const attr in attrs) {
          if (svgEl && attrs.hasOwnProperty(attr)) {
            svgEl.setAttribute(attr, attrs[attr]);
          }
        }
        svgEl && setRawIcon(getTextHTML(svgEl))
      }
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    loadRawData(name)
  }, [name])

  if (!rawIcon) {
    // If icon name is not found, render a placeholder or return null
    return null;
  }

  return (
    rawIcon && <span dangerouslySetInnerHTML={{ __html: rawIcon }} />
  );
}

export {
  Icon
}