//header
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 70) {
            $('.nav-menu-wrapper').addClass('sticky')
        }
        else {
            $('.nav-menu-wrapper').removeClass('sticky')
        }
    })
})

//dark mode - light mode
const body = document.body;
const switch_mode = document.querySelector('#mode img');
// Load mode 
let mode = localStorage.getItem('darkmode');
if (mode == 'true') {
    body.classList.add('dark');
    switch_mode.className = "dark-light";
}

switch_mode.addEventListener('click', () => {
    switch_mode.classList.toggle('dark-light');
    switch_mode.classList.toggle('dark-light');
    let mode = body.classList.toggle('dark');
    // save mode 
    localStorage.setItem('darkmode', mode);
});

// function region
function updateCartNumberProduct() {
    let num = $('.cart-content-product').length;
    console.log(num)
    $('.cart-num-product').text(num);
}



function updateCartItemPrice($cartItemPrice, singlePrice, newQuantity) {
    let cartItemPrice = singlePrice * newQuantity;

    $cartItemPrice.text(formatCurrency(cartItemPrice));
}

function updateTotalPrice() {
    var totalPrice = 0;
    $('.cart-item-price').each(function () {
        var price = $(this).text();
        price = parseInt(price.replace(/[đ.]/g, ''));
        totalPrice += price;
    });

    $('.org-price').text(formatCurrency(totalPrice))
    totalPrice = totalPrice - parseInt($('.discounted-price').text().replace(/[đ.-]/g, ''));
    if (totalPrice < 0) {
        totalPrice = 0
    }
    $('.total-price').text(formatCurrency(totalPrice));
}

function formatCurrency(number) {
    if (typeof number !== 'number') {
        return number;
    }
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function updateButtonState($product, value) {
    var $decreaseButton = $product.find('.decrease');
    if (value <= 1) {
        $decreaseButton.addClass('disabled');
    } else {
        $decreaseButton.removeClass('disabled');
    }
}


// end function region
// function generateLiElement(number){
//     for (let i = 2; i <= number; i++){
//         let $newListItem = $('<li class="link" value="' + i + '" onclick="activeLinkPage(this)">'+ i + '</li>')
//         $('.pag-box ul').append($newListItem)
//     }
// }

function activeLinkPage(element) {
    link.each(function (index) {
        $(this).removeClass('active');
    })
    let $liElement = $(element);
    // let newPage = $liElement.attr('value');
    currentPage = $liElement.attr('value');
    currentBookPage = $liElement.attr('value')
    showPage(currentPage);
    showBookPage(currentBookPage)

    $liElement.addClass("active");
}

function toPrevPage() {
    console.log("clicked")
    if (currentPage > 1) {
        link.each(function () {
            console.log(this)
            $(this).removeClass('active')
        })
        currentPage--;
        link.eq(currentPage - 1).addClass('active');
        showPage(currentPage);
    }
}

function toNextPage() {
    console.log("clicked")
    if (currentPage < numPage) {
        link.each(function () {
            console.log(this)
            $(this).removeClass('active')
        })
        currentPage++;
        link.eq(currentPage - 1).addClass('active');
        showPage(currentPage);
    }
}

function showPage(page) {
    let productArray = $('.sale-grid-container .product-item');
    let start = (page - 1) * 12;
    let end = (page) * 12 - 1;
    productArray.each(function (index) {
        if (index >= start && index <= end) {
            $(this).css("display", "flex");
        } else {
            $(this).css("display", "none")
        }
    })
}

let itemInPage = 12;
let link = $('.link');
let numPage = Math.floor(($('.sale-grid-container .product-item').length - 1) / itemInPage) + 1;

let currentPage = 1;
showPage(currentPage);




//  For Book Page
function showBookPage(bookPage) {
    let productArray = $('.list-book-items .product-item');
    let start = (bookPage - 1) * 15;
    let end = (bookPage) * 15 - 1;
    productArray.each(function (index) {
        if (index >= start && index <= end) {
            $(this).css("display", "flex");
        } else {
            $(this).css("display", "none")
        }
    })
}

function toPrevPage() {
    console.log("clicked")
    if (currentPage > 1) {
        link.each(function () {
            console.log(this)
            $(this).removeClass('active')
        })
        currentPage--;
        link.eq(currentPage - 1).addClass('active');
        showPage(currentPage);
    }
}

function toPrevBookPage() {
    console.log("clicked")
    if (currentBookPage > 1) {
        link.each(function () {
            console.log(this)
            $(this).removeClass('active')
        })
        currentBookPage--;
        link.eq(currentBookPage - 1).addClass('active');
        showBookPage(currentBookPage);
    }
}

function toNextBookPage() {
    console.log("clicked")
    if (currentBookPage < numBookPage) {
        link.each(function () {
            console.log(this)
            $(this).removeClass('active')
        })
        currentBookPage++;
        link.eq(currentBookPage - 1).addClass('active');
        showBookPage(currentBookPage);
    }
}

let itemBookInPage = 15;
let currentBookPage = 1;
let numBookPage = Math.floor(($('.list-book-items .product-item').length - 1) / itemBookInPage) + 1;
showBookPage(currentBookPage)

updateCartNumberProduct();

$(document).ready(function () {
    $('#add-to-cart-form').on('submit', function (e) {
        e.preventDefault();
        console.log('sbmit')
        var cart = $('#cart-icon');
        var imgtodrag = $(this).closest('.product-detail-box').find("img").eq(0);
        console.log(imgtodrag)
        if (imgtodrag) {
            var imgclone = imgtodrag.clone()
                .offset({
                    top: imgtodrag.offset().top + 70,
                    left: imgtodrag.offset().left + 50
                })
                .css({
                    'opacity': '0.5',
                    'position': 'absolute',
                    'height': '135px',
                    'width': '90px',
                    'z-index': '100'
                })
                .appendTo($('body'))
                .animate({
                    'top': cart.offset().top + 10,
                    'left': cart.offset().left + 10,
                    'width': 30,
                    'height': 45
                }, 1000, 'easeInOutExpo');

            imgclone.animate({
                'width': 0,
                'height': 0
            }, function () {
                $(this).detach()
            });
        }

        let currentCartNumber = parseInt($('.cart-num-product').text());
        if (parseInt($('.cart-num-product').text()) < 1) {
            $('.cart-num-product').text(currentCartNumber + 1);
        }

        let toast = new bootstrap.Toast($("#add-cart-succ-toast")[0]);
        toast.show();

    })


    // console.log(Date.now())
    var endTime = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 tiếng từ thời điểm hiện tại, tính theo milisecond
    // console.log(endTime)
    var timer = setInterval(function () {
        var now = new Date();
        var remaining = endTime - now;
        // console.log(remaining)
        var hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        $('.hours').text(hours < 10 ? '0' + hours : hours);
        $('.minutes').text(minutes < 10 ? '0' + minutes : minutes);
        $('.seconds').text(seconds < 10 ? '0' + seconds : seconds);

        if (remaining < 0) {
            clearInterval(timer);
            $('.countdown').innerHTML() = 'Hết giờ!';
        }
    }, 1000);


    $('.accordion-ul li').click(function () {
        $(this).closest('.accordion-body').find('.accordion-ul li').removeClass('active');


        // Thêm class 'active' vào phần tử li được nhấn
        $(this).addClass('active');
    });

    $('.noti').on('mouseover', function () {
        $('.notification-box').css('display', "block");
    }).on('mouseout', function () {
        $('.notification-box').css('display', "none");
    })

    $('.book-slider .carousel-control-next').on('click', function () {
        // Tìm slider cụ thể chứa nút next được nhấn
        var $carouselInner = $(this).closest('.book-slider').find('.carousel-inner');

        var carouselWidth = $carouselInner[0].scrollWidth;
        var cardWidth = $carouselInner.find('.carousel-item').width();
        var scrollPosition = $carouselInner.scrollLeft();
        console.log(carouselWidth);    //width: 1990
        console.log(scrollPosition);
        if (scrollPosition < (carouselWidth - (cardWidth + 20) * 6 - 10)) {
            scrollPosition = scrollPosition + cardWidth + 20;
        } else {
            scrollPosition = 0;
        }
        console.log(scrollPosition);

        $carouselInner.animate({ scrollLeft: scrollPosition }, 600);
    });

    $('.book-slider .carousel-control-prev').on('click', function () {
        var $carouselInner = $(this).closest('.book-slider').find('.carousel-inner');

        var carouselWidth = $carouselInner[0].scrollWidth;
        var cardWidth = $carouselInner.find('.carousel-item').width();
        var scrollPosition = $carouselInner.scrollLeft();

        console.log(scrollPosition);
        if (scrollPosition > 0) {
            scrollPosition = scrollPosition - cardWidth - 20;
        } else {
            scrollPosition = carouselWidth - (cardWidth + 20) * 6 - 10;
        }
        console.log(scrollPosition);

        $carouselInner.animate({ scrollLeft: scrollPosition }, 600);
    });

    // Tăng giảm số lượng sản phẩm khi nhấn vào nút + / -
    $('.increase').on('click', function () {
        let $inputElement = $(this).closest('.quantity-box').find('.quantity-input');
        let $parentProduct = $(this).closest('.cart-content-product');
        let $cartItemPrice = $parentProduct.find('.cart-item-price');
        let singlePrice = parseInt($parentProduct.find('.book-price-single').text().replace(/[đ.]/g, ''));

        let newQuantity = parseInt($inputElement.val()) + 1;
        $inputElement.val(newQuantity);
        updateButtonState($parentProduct, newQuantity)

        updateCartItemPrice($cartItemPrice, singlePrice, newQuantity)
        updateTotalPrice();
    })

    $('.decrease').on('click', function () {
        let $inputElement = $(this).closest('.quantity-box').find('.quantity-input');
        let $parentProduct = $(this).closest('.cart-content-product');
        let $cartItemPrice = $parentProduct.find('.cart-item-price');
        let singlePrice = parseInt($parentProduct.find('.book-price-single').text().replace(/[đ.]/g, ''));
        let newQuantity = parseInt($inputElement.val());

        if (parseInt($inputElement.val()) > 1) {
            newQuantity = newQuantity - 1
            $inputElement.val(newQuantity);
            updateButtonState($parentProduct, newQuantity);
        } else {
            $inputElement.val(1);
            updateButtonState($parentProduct, newQuantity);
        }

        updateCartItemPrice($cartItemPrice, singlePrice, newQuantity)
        updateTotalPrice();
    })

    $('.quantity-input').on('change', function () {
        let $parentProduct = $(this).closest('.cart-content-product');
        let $cartItemPrice = $parentProduct.find('.cart-item-price');
        let singlePrice = parseInt($parentProduct.find('.book-price-single').text().replace(/[đ.]/g, ''));
        let newValue = $(this).val();
        let newQuantity = 1;
        console.log(newValue);
        if (newValue && newValue > 0) {
            newQuantity = newValue;
        } else {
            console.log("Not a number")
            $(this).val(1)
        }

        updateCartItemPrice($cartItemPrice, singlePrice, newQuantity)
        updateTotalPrice();

    })

    $('.cart-delete-product').on('click', function () {
        let $parentProductItem = $(this).closest('.cart-content-product');
        $('#confirmDeleteModal').modal('show');
        $('#deleteConfirm').click(function () {
            $parentProductItem.remove();

            updateTotalPrice();
            updateCartNumberProduct();

            let toast = new bootstrap.Toast($("#remove-succ-toast")[0]);
            toast.show();
            // Đóng modal
            $('#confirmDeleteModal').modal('hide');
        });
        // $parentProductItem.remove();

        // updateTotalPrice();
    })

    $(".discount-btn").click(function () {
        let discountedPrice
        let $inputDiscount = $(this).closest('.discount-form').find('.discount-inp');
        if ($inputDiscount.val() == "GIAMGIA100K") {
            discountedPrice = 100000;
        } else if ($inputDiscount.val() == "GIAMGIA200K") {
            discountedPrice = 200000;
        } else {
            let toast = new bootstrap.Toast($("#discount-fail-toast")[0]);
            discountedPrice = 0;
            $('.discounted-price').text('-' + formatCurrency(discountedPrice));
            $('.total-price').text(formatCurrency(parseInt($('.org-price').text().replace(/[đ.]/g, ''))));
            toast.show();
            return
        }
        let toast = new bootstrap.Toast($("#discount-succ-toast")[0]);
        toast.show();
        let originalPrice = parseInt($('.org-price').text().replace(/[đ.]/g, ''));
        let totalPrice = originalPrice - discountedPrice;
        if (totalPrice < 0) {
            totalPrice = 0;
        }
        $('.discounted-price').text('-' + formatCurrency(discountedPrice));
        $('.total-price').text(formatCurrency(totalPrice));

    });

    $('.email-btn').on('click', function () {
        let emailToast = new bootstrap.Toast($("#email-sub-toast")[0]);
        emailToast.show();
    })

    $('.customer-img').on('mouseover', function () {
        let $customerImageArray = $(this).closest('.customer-box').find('.customer-img');
        $customerImageArray.filter('.selected-img').removeClass("selected-img");
        $(this).addClass("selected-img")
        let id = $(this).closest('.customer-box-item').attr("id");
        if (id === "portrait1") {
            $('.customer-review').text("Mỗi tác giả, mỗi chủ đề lại có cách dùng từ và lối biểu đạt riêng. Do đó, quá trình đọc sách cũng đồng thời giúp chúng ta bổ sung thêm vốn từ vựng của mình, học hỏi thêm nhiều thuật ngữ mới. Từ đây, văn phong của bạn cũng được cải thiện rõ rệt qua từng ngày.")
        } else if (id == "portrait2") {
            $('.customer-review').text("Sách là nguồn tri thức vô hạn, giúp chúng ta có thể bổ sung kiến thức và nâng cao vốn hiểu biết của chính mình. Ở sách, bạn có thể tìm tòi thêm về văn hoá - chính trị, kinh tế - xã hội, lịch sử hoặc đơn giản hơn là phong cách sống,... Những điều tưởng chừng nhỏ nhặt nhất trong cuộc sống như cách nói lời cảm ơn, xin lỗi cũng được truyền tải nhẹ nhàng và tinh tế qua những trang sách. ")
        } else {
            $('.customer-review').text("Một trong những lợi ích của đọc sách được nhiều người công nhận chính là khả năng kích thích tinh thần. Khi gặp phải một số vấn đề trong đời sống, công việc, học tập, chúng ta thường có thói quen tìm đến những thứ giúp bình ổn tâm trạng.");
        }
    })


    $('.reply-btn').click(function () {
        var newComment = $('.new-reply-comment').first().clone(); // Sao chép khối bình luận mới
        newComment.addClass("new-empty-reply-comment");
        // newComment.show(); // Hiển thị khối bình luận
        $('#new-main-cmt').hide();
        $('#cmt').show();
        // Thêm khối bình luận mới vào ngay sau nút "Trả lời" được nhấn
        $(this).closest('.comment-group').find('.comment').last().after(newComment);
    });

    $('#reply-form').on('submit', function (e) {
        e.preventDefault();
        let obj = {
            name: $(this).find('.new-cmt-name').val(),
            email: $(this).find('.new-cmt-email').val(),
            content: $(this).find('.new-cmt-content').val()
        }

        // console.log(obj)
        let authorHTMLString = '<span style="font-weight: 500; font-size: 16px; margin-right: 15px; color: #383838">' + obj.name + '</span> vài giây trước'

        let newComment = $('.new-empty-reply-comment');
        newComment.find('.author-comment-name').html(authorHTMLString)
        newComment.find('.author-comment-content').text(obj.content)

        newComment.removeClass("new-reply-comment new-empty-reply-comment");
        newComment.addClass("reply-comment");
        // newComment.addClass("");
        newComment.show();
        this.reset();

        $('#cmt').hide();
        $('#new-main-cmt').show();
        location.href = '#others-comment-container';
    })

    $('#new-cmt-form').on('submit', function (e) {
        e.preventDefault();
        let obj = {
            name: $(this).find('.new-cmt-name').val(),
            email: $(this).find('.new-cmt-email').val(),
            content: $(this).find('.new-cmt-content').val()
        }
        console.log(obj)
        let $newCommentGroup = $('.new-comment-group').first().clone();
        $newCommentGroup.addClass('comment-group');
        $newCommentGroup.removeClass('new-comment-group');

        let authorHTMLString = '<span style="font-weight: 500; font-size: 16px; margin-right: 15px; color: #383838">' + obj.name + '</span> vài giây trước';
        $newCommentGroup.find('.author-comment-name').html(authorHTMLString)
        $newCommentGroup.find('.author-comment-content').text(obj.content)
        $($newCommentGroup).find('.main-comment').show();
        $('.others-comment-container').find('.comment-group').last().after($newCommentGroup);

        this.reset();
    })

    function setMinAndMaxValues() {
        var minValue = parseInt($('.range-min').val());
        var maxValue = parseInt($('.range-max').val());

        if (maxValue < minValue) {
            minValue = maxValue;
            $('.range-min').val(minValue);
        }

        $('.input-min').val(minValue);
        $('.input-max').val(maxValue);
    }

    $('.range-min, .range-max').on('input', function () {
        setMinAndMaxValues();
    });

    $('.input-min').on('input', function () {
        var value = parseInt($(this).val());
        $('.range-min').val(value);
        setMinAndMaxValues();
    });

    $('.input-max').on('input', function () {
        var value = parseInt($(this).val());
        $('.range-max').val(value);
        setMinAndMaxValues();
    });

    $(function () {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 500000,
            values: [0, 500000], // Giá trị mặc định khi bắt đầu
            step: 10000,
            slide: function (event, ui) {
                $("#amount-min").text(new Intl.NumberFormat().format(ui.values[0]) + 'đ');
                $("#amount-max").text(new Intl.NumberFormat().format(ui.values[1]) + 'đ');
            }
        });
        $("#amount-min").text(new Intl.NumberFormat().format($("#slider-range").slider("values", 0)) + 'đ');
        $("#amount-max").text(new Intl.NumberFormat().format($("#slider-range").slider("values", 1)) + 'đ');
        // $("#amount-min").text($("#slider-range").slider("values", 0));
        // $("#amount-max").text($("#slider-range").slider("values", 1));
    });

    $('.rating input[type="checkbox"]').change(function () {
        // Thêm mã để xử lý khi checkbox thay đổi
        console.log($(this).val() + ' Star(s) Selected');
    });


    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        let account = {
            username: $('#login-form input[name="username"]').val(),
            password: $('#login-form input[name="password"]').val()
        }
        console.log(account);

        if (account.username == "customer" && account.password == "123456") {
            let toast = new bootstrap.Toast($("#log-succ-toast")[0]);
            toast.show();

            setTimeout(function () {
                window.location.href = "index.html";
            }, 3000);
        } else {
            let toast = new bootstrap.Toast($("#log-fail-toast")[0]);
            toast.show();
        }
    })

    $('#register-form').on('submit', function (e) {
        e.preventDefault();
        let toast = new bootstrap.Toast($("#reg-succ-toast")[0]);
        toast.show();
        setTimeout(function () {
            window.location.href = "index.html";
        }, 3000);
    })
})