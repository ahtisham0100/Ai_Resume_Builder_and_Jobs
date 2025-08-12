import React from "react";

const Loader = () => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md rounded-2xl p-10 z-50"
           
        >
            <div className="flex space-x-2 mb-6">
                <div className="box-anim bg-yellow-400 w-6 h-6 rounded-md"></div>
                <div className="box-anim box-delay-1 bg-red-400 w-6 h-6 rounded-md"></div>
                <div className="box-anim box-delay-2 bg-green-400 w-6 h-6 rounded-md"></div>
                <div className="box-anim box-delay-3 bg-white/80 w-6 h-6 rounded-md"></div>
            </div>
            <div className="text-2xl font-semibold text-white drop-shadow-lg animate-pulse">
                Loading...
            </div>
            <style>
                {`
                    @keyframes boxJump {
                        0%, 100% { transform: translateY(0);}
                        50% { transform: translateY(-18px) scale(1.08);}
                    }
                    .box-anim {
                        animation: boxJump 1s infinite cubic-bezier(.68,-0.55,.27,1.55);
                        display: inline-block;
                        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.25));
                    }
                    .box-delay-1 {
                        animation-delay: 0.15s;
                    }
                    .box-delay-2 {
                        animation-delay: 0.3s;
                    }
                    .box-delay-3 {
                        animation-delay: 0.45s;
                    }
                `}
            </style>
        </div>
    );
};

export default Loader;