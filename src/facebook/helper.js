   // SIDE SPONSORED ADS
   const sponsoredDivs = document.querySelectorAll('[role="complementary"]');
   if (sponsoredDivs) {
     sponsoredDivs.forEach((div) => {
       if (!(div instanceof HTMLElement)) return;
       if (!div.dataset.processed) {
         const targetDiv = div.querySelector(".x1y1aw1k");
         if (targetDiv) {
           const sideSponsorDiv = div.querySelector("span");
           if (sideSponsorDiv) {
             sideSponsorDiv.style.display = "none";
           } else {
             console.log("No span found within targetDiv.");
           }
         } else {
           console.log(
             "No div with class name x1y1aw1k found within sponsoredDivs."
           );
         }
         div.dataset.processed = "true";
       }
     });
   }

   import observeMutations from "./Observer";

// GET THE CURRENT URL AND RUN THE FUNCTION ACCORDINGLY
const CURRENT_URL = window.location.href;

export async function FacebookFeedSponser() {
  if (!CURRENT_URL.startsWith("https://www.facebook.com")) return;
  // Function to process feed sponsor
  const processFeedSponsor = () => {
    // USER FEED SPONSORED POST
    const feedPostType = document.querySelectorAll('div[role="main"]');
    const postParentDivs = document.querySelectorAll(".x1lliihq");

    const spanTexts: Set<string> = new Set();
    feedPostType.forEach((element) => {
      if (element && element instanceof HTMLElement) {
        postParentDivs.forEach((div) => {
          if (!(div instanceof HTMLElement)) return;
          if (!div.dataset.processed) {
            Array.from(document.querySelectorAll(".x1e56ztr.xtvhhri")).forEach(
              (n) => {
                const parent = n.parentElement;
                if (!(parent instanceof HTMLElement)) return;

                const spansInDiv = parent.querySelectorAll("span");
                spansInDiv.forEach((span) => {
                  spanTexts.add(
                    span.textContent 
                  );
                  let parentDiv = span.parentElement;
                  while (parentDiv) {
                    if (
                      parentDiv.classList.contains("x1lliihq") &&
                      parentDiv.classList.length === 1
                    ) {
                      // console.log(
                      //   "Parent div with only class x1lliihq:",
                      //   parentDiv
                      // );

                      {
                        const parentDivs =
                          document.querySelectorAll(".x1lliihq");
                        ImageTextMatched(spanTexts, parentDivs);
                        // parentDiv.style.display = "none";
                        break;
                      }
                    }
                    parentDiv = parentDiv.parentElement;
                  }
                });
              }
            );
            const strongElementsInDiv = div.querySelectorAll("strong");

            strongElementsInDiv.forEach((strongElement) => {
              const spanElements = strongElement.querySelectorAll("span");
              spanElements.forEach((span) => {
                imageMatched(span, spanTexts, postParentDivs);
              });
            });
            div.dataset.processed = "true";
          }
        });
      }
    });
  };

  observeMutations(processFeedSponsor);
}

// Function to match images and text
function imageMatched(
  span: HTMLElement,
  spanTexts: Set<string>,
  postParentDivs: NodeListOf<Element>
) {
  spanTexts.add(span.textContent?.trim() || "");
  if (span) {
    postParentDivs.forEach((div) => {
      if (!(div instanceof HTMLElement)) return;
      if (!div.dataset.processed) {
        const imageElementsInDiv = div.querySelectorAll("img");
        imageElementsInDiv.forEach((image) => {
          if (image && image.naturalWidth > 300 && image.naturalHeight > 300) {
            const imageAlt = image.getAttribute("alt");
            // console.log(imageAlt);
            if (imageAlt && spanTexts.has(imageAlt.trim())) {
              div.style.display = "none";
              // console.log(div, "imageMatched");
            } else if (imageAlt === "") {
              div.style.display = "none";
              // console.log(div, "no ALT");
            }
          }
        });
        div.dataset.processed = "true";
      }
    });
  }
}

function ImageTextMatched(
  spanTexts: Set<string>,
  postParentDivs: NodeListOf<Element>
) {
  postParentDivs.forEach((div) => {
    if (!(div instanceof HTMLElement)) return;
    if (!div.dataset.processed) {
      const imageElementsInDiv = div.querySelectorAll("img");
      imageElementsInDiv.forEach((image) => {
        if (image && image.naturalWidth > 300 && image.naturalHeight > 300) {
          const imageAlt = image.getAttribute("alt");
          if (imageAlt) {
            const altChars = imageAlt.split('');
            const altMatches = altChars.some(char => spanTexts.has(char));
            if (altMatches) {
              div.style.display = "none";
              console.log(div, "imageMatched");
            }
          } else {
            div.style.display = "none"; // Hide the div if alt text is empty
          }
        }
      });
      div.dataset.processed = "true";
    }
  });
}


export default FacebookFeedSponser;
