
        const url = "2605 [09-09-69].pdf"; 
        let pdfDoc = null,
            pageNum = 1,
            pageRendering = false,
            pageNumPending = null,
            scale = 0.3,
            canvas = document.getElementById("pdf-canvas"),
            ctx = canvas.getContext("2d");

        function renderPage(num) {
            pageRendering = true;
            pdfDoc.getPage(num).then((page) => {
                const viewport = page.getViewport({ scale });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport,
                };
                const renderTask = page.render(renderContext);

                renderTask.promise.then(() => {
                    pageRendering = false;
                    if (pageNumPending !== null) {
                        renderPage(pageNumPending);
                        pageNumPending = null;
                    }
                });
            });

            document.getElementById("page-num").textContent = `Página ${num}`;
        }

        function queueRenderPage(num) {
            if (pageRendering) {
                pageNumPending = num;
            } else {
                renderPage(num);
            }
        }

        document.getElementById("prev-page").addEventListener("click", () => {
            if (pageNum <= 1) return;
            pageNum--;
            queueRenderPage(pageNum);
        });

        document.getElementById("next-page").addEventListener("click", () => {
            if (pageNum >= pdfDoc.numPages) return;
            pageNum++;
            queueRenderPage(pageNum);
        });

        pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
            pdfDoc = pdfDoc_;
            document.getElementById("page-num").textContent = `Página ${pageNum} de ${pdfDoc.numPages}`;
            renderPage(pageNum);
        });
