//숫자만, 콤마 추가
function addCommas(input) {
    var val = input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //if(val == "") val = 0;
    return val;
}

//숫자만, 콤마 제거
function removeCommas(input) {
    var val = parseInt(input.toString().replace(/[^\d]+/g, ''));
    //if(val == "" || isNaN(val)) val = 0;
    if (isNaN(val)) val = '';
    return val;
}

//숫자만
function onlyNumber(input) {
    var val = input.toString().replace(/[^0-9]/g, "");
    return val;
}

function onlyCommission(input) {
    //var val = input.toString().replace(/[^-\.0-9]/g, "");    
    //return val;
    var _pattern1 = /^([1-9]{1}\d{0,2}|0{1})(\.{1}\d{0,2})?$/g;
    if (!_pattern1.test(input)) {
        return input.substr(0, input.length - 1);
    } else {
        return input
    }
}

function onlyCommissionBlur(input) {
    var val = input.toString().replace(/[^-\.0-9]/g, "");
    if (val != '') val = parseFloat(val).toFixed(2);
    return val;
}

function CkUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader)
    }
}

$(function () {
    //금액 필드 설정
    $(".amount").on("keyup", function (e) {
        var v = removeCommas($(this).val());
        $(this).val(addCommas(v));
    }).css('text-align', 'right');

    //금액 필드 설정
    $(".amount").each(function (index, item) {
        var v = removeCommas($(item).val());
        $(item).val(addCommas(v));
    });

    //숫자 필드 설정
    $(".number").on("keyup", function (e) {
        $(this).val(onlyNumber($(this).val()));
    });

    //수수료 필드 설정
    $(".commission").on("keyup", function (e) {
        $(this).val(onlyCommission($(this).val()));
    });

    //수수료 필드 설정
    $(".commission").blur(function (e) {
        $(this).val(onlyCommissionBlur($(this).val()));
    });

    //달력 컴포넌트
    $(".date").flatpickr({
        locale: 'ko',
        dateFormat: "Y-m-d",
        disableMobile: "true",
    });

    $(".dateTodayMax").flatpickr({
        locale: 'ko',
        dateFormat: "Y-m-d",
        disableMobile: "true",
        maxDate: "today"
    });

    //달력 시간 컴포넌트
    $(".date_time").flatpickr({
        locale: 'ko',
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true,
        disableMobile: "true",
        minuteIncrement: 1
    });

    $(".date_ymdhis").flatpickr({
        locale: 'ko',
        enableTime: true,
        enableSeconds: true,
        dateFormat: "Y-m-d H:i:s",
        time_24hr: true,
        disableMobile: "true",
        minuteIncrement: 1
    });

    $('input[type="text"], input[type="password"]').on('keydown', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        };
    });

    $('#searchText').on('keydown', function (e) {
        if (e.keyCode === 13) {
            $(this).next('#btnSearch').click();
        }
    });

    $('form').on('submit', function () {
        loading('show');
    });
});

function userDetail(userIdx, tabType) {
    if (typeof window.openUserDetailModal === 'function') {
        window.openUserDetailModal(userIdx, tabType);
        return;
    }

    var nWidth = "945";
    var nHeight = "850";

    var curX = window.screenLeft;
    var curY = window.screenTop;
    var curWidth = document.body.clientWidth;
    var curHeight = document.body.clientHeight;

    var nLeft = curX + (curWidth / 2) - (nWidth / 2);
    var nTop = curY + (curHeight / 2) - (nHeight / 2);

    var url = '/user/user/detail?userIdx=' + userIdx + '&tabType=' + tabType;
    window.open(url, 'userDetail' + userIdx, 'top=' + nTop + ', left=' + nLeft + ',width=' + nWidth + ', height=' + nHeight + ', status=no, menubar=no, toolbar=no');
}

function messageWrite(userIdx) {
    var nWidth = "750";
    var nHeight = "690";

    var curX = window.screenLeft;
    var curY = window.screenTop;
    var curWidth = document.body.clientWidth;
    var curHeight = document.body.clientHeight;

    var nLeft = curX + (curWidth / 2) - (nWidth / 2);
    var nTop = curY + (curHeight / 2) - (nHeight / 2);

    window.open('/message/write?receiverId=' + userIdx, 'messageWrite', 'top=' + nTop + ', left=' + nLeft + ',width=' + nWidth + ', height=' + nHeight + ', status=no, menubar=no, toolbar=no');
}

function userAdd(userIdx) {
    var nWidth = "500";
    var nHeight = "370";

    var curX = window.screenLeft;
    var curY = window.screenTop;
    var curWidth = document.body.clientWidth;
    var curHeight = document.body.clientHeight;

    var nLeft = curX + (curWidth / 2) - (nWidth / 2);
    var nTop = curY + (curHeight / 2) - (nHeight / 2);

    if (userIdx == undefined) userIdx = '';

    window.open('/user/userAdd.html?parentUserIdx=' + userIdx, '', 'top=' + nTop + ', left=' + nLeft + ',width=' + nWidth + ', height=' + nHeight + ', status=no, menubar=no, toolbar=no');
}

function userAddMulti(userIdx) {
    var nWidth = "500";
    var nHeight = "370";

    var curX = window.screenLeft;
    var curY = window.screenTop;
    var curWidth = document.body.clientWidth;
    var curHeight = document.body.clientHeight;

    var nLeft = curX + (curWidth / 2) - (nWidth / 2);
    var nTop = curY + (curHeight / 2) - (nHeight / 2);

    if (userIdx == undefined) userIdx = '';

    window.open('/user/userAddMulti?parentUserIdx=' + userIdx, '', 'top=' + nTop + ', left=' + nLeft + ',width=' + nWidth + ', height=' + nHeight + ', status=no, menubar=no, toolbar=no');
}

function couponAdd(userIdx) {
    var nWidth = "870";
    var nHeight = "800";

    var curX = window.screenLeft;
    var curY = window.screenTop;
    var curWidth = document.body.clientWidth;
    var curHeight = document.body.clientHeight;

    var nLeft = curX + (curWidth / 2) - (nWidth / 2);
    var nTop = curY + (curHeight / 2) - (nHeight / 2);

    window.open('/coupon/couponAdd.html?receiverIdx=' + (userIdx != undefined ? userIdx : ''), 'couponAdd', 'top=' + nTop + ', left=' + nLeft + ',width=' + nWidth + ', height=' + nHeight + ', status=no, menubar=no, toolbar=no');
}

function resizeContent(id, minusHeight) {
    let height = window.innerHeight - minusHeight;
    $("#" + id).parent().css("max-height", height + "px");
    $("#" + id).parent().css("min-height", "500px");
    $("#" + id).parent().parent().css("overflow", "auto");
}

function loading(opt) {
    if (opt == 'show') {
        $('#modal-spinner').show();
    } else {
        $('#modal-spinner').hide();
    }
}

jQuery.fn.serializeObject = function () {
    var obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
            var arr = this.serializeArray();
            if (arr) {
                obj = {};
                jQuery.each(arr, function () {
                    obj[this.name] = this.value;
                });
            }
        }
    } catch (e) {
        alert(e.message);
    } finally { }
    return obj;
}

function ISOTODate(ts) {
    var d = new Date(ts);

    const days = ["일", "월", "화", "수", "목", "금", "토"];

    return d.getFullYear() + '년 ' +
        ('0' + (d.getMonth() + 1)).slice(-2) + '월 ' +
        ('0' + d.getDate()).slice(-2) + '일 ' +
        '(' + days[d.getDay()] + ')';
}

function ISOTODateYmd(ts) {
    var d = new Date(ts);
    return d.getFullYear() +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        ('0' + d.getDate()).slice(-2);
}

function ISOTOTime(ts) {
    var d = new Date(ts);

    return ('0' + d.getHours()).slice(-2) + ':' +
        ('0' + d.getMinutes()).slice(-2);
}