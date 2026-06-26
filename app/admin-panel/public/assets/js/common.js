/* eslint-disable */
//ìˆ«ìžë§Œ, ì½¤ë§ˆ ì¶”ê°€
function addCommas(input) {
    var val = input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //if(val == "") val = 0;
    return val;
}

//ìˆ«ìžë§Œ, ì½¤ë§ˆ ì œê±°
function removeCommas(input) {
    var val = parseInt(input.toString().replace(/[^\d]+/g, ''));
    //if(val == "" || isNaN(val)) val = 0;
    if (isNaN(val)) val = '';
    return val;
}

//ìˆ«ìžë§Œ
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
    //ê¸ˆì•¡ í•„ë“œ ì„¤ì •
    $(".amount").on("keyup", function () {
        var v = removeCommas($(this).val());
        $(this).val(addCommas(v));
    }).css('text-align', 'right');

    //ê¸ˆì•¡ í•„ë“œ ì„¤ì •
    $(".amount").each(function (index, item) {
        var v = removeCommas($(item).val());
        $(item).val(addCommas(v));
    });

    //ìˆ«ìž í•„ë“œ ì„¤ì •
    $(".number").on("keyup", function () {
        $(this).val(onlyNumber($(this).val()));
    });

    //ìˆ˜ìˆ˜ë£Œ í•„ë“œ ì„¤ì •
    $(".commission").on("keyup", function () {
        $(this).val(onlyCommission($(this).val()));
    });

    //ìˆ˜ìˆ˜ë£Œ í•„ë“œ ì„¤ì •
    $(".commission").blur(function () {
        $(this).val(onlyCommissionBlur($(this).val()));
    });

    //ë‹¬ë ¥ ì»´í¬ë„ŒíŠ¸
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

    //ë‹¬ë ¥ ì‹œê°„ ì»´í¬ë„ŒíŠ¸
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
    // If the React-controlled modal is available, use it instead of opening a window
    if (typeof window !== 'undefined' && window.openUserDetailModal) {
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
    var win = window.open(url, '', 'top=' + nTop + ', left=' + nLeft + ',width=' + nWidth + ', height=' + nHeight + ', status=no, menubar=no, toolbar=no');

    // Add event listener for when the window loads
    if (win) {
        win.onload = function () {
            // Remove active class from all nav-links
            win.document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to the specified tab
            var activeTab = win.document.querySelector(`a[href="#user-tab-${tabType}"]`);
            if (activeTab) {
                activeTab.classList.add('active');

                // Hide all tab panes
                win.document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('show', 'active');
                });

                // Show the active tab pane
                var activePane = win.document.querySelector(`#user-tab-${tabType}`);
                if (activePane) {
                    activePane.classList.add('show', 'active');
                }

                // Call tabClick to load the content
                if (typeof win.tabClick === 'function') {
                    win.tabClick(tabType);
                }
            }
        };
    }
}

function messageWrite(userIdx) {
    if (typeof window !== 'undefined' && window.openMessageWriteModal) {
        window.openMessageWriteModal(userIdx);
        return;
    }
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
    if (typeof window !== 'undefined' && window.openUserAddModal) {
        window.openUserAddModal(userIdx);
        return;
    }
    var nWidth = "500";
    var nHeight = "370";

    var curX = window.screenLeft;
    var curY = window.screenTop;
    var curWidth = document.body.clientWidth;
    var curHeight = document.body.clientHeight;

    var nLeft = curX + (curWidth / 2) - (nWidth / 2);
    var nTop = curY + (curHeight / 2) - (nHeight / 2);

    if (userIdx == undefined) userIdx = '';

    window.open('/user/user/add?parentUserIdx=' + userIdx, '', 'top=' + nTop + ', left=' + nLeft + ',width=' + nWidth + ', height=' + nHeight + ', status=no, menubar=no, toolbar=no');
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

    const days = ["ì¼", "ì›”", "í™”", "ìˆ˜", "ëª©", "ê¸ˆ", "í† "];

    return d.getFullYear() + 'ë…„ ' +
        ('0' + (d.getMonth() + 1)).slice(-2) + 'ì›” ' +
        ('0' + d.getDate()).slice(-2) + 'ì¼ ' +
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