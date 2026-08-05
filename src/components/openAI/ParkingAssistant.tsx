import { useMutation } from "@tanstack/react-query";
import { X, Minus, Bot, Send } from "lucide-react";
import { useContext, useState } from "react";
import { create } from "../../services";
import { GlobalApplicationContext } from "../../context/GlobalApplicationContextProvider";

export type ParkingAssistantProps = {
  onClose: () => void;
};

type AvailableSpot = {
  spotId: number;
  number: string;
  spotType: string;
  parkingName: string;
  priceHour: number;
  imageUrl: string;
  startDateTime: string;
  endDateTime: string;
  address: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  availableSpots?: AvailableSpot[];
};

function ParkingAssistant({ onClose }: ParkingAssistantProps) {
  const {
    state: { token },
  } = useContext(GlobalApplicationContext);

  const [conversationId] = useState(() => crypto.randomUUID());
  const [minimized, setMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = (text: string) => {
    const currentMessage = text.trim();

    if (!currentMessage) {
      return;
    }

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        role: "user",
        content: currentMessage,
      },
    ]);

    mutation.mutate(currentMessage);
    setMessage("");
  };

  const reservationMutation = useMutation({
    mutationFn: (spot: AvailableSpot) =>
      create({
        url: "reservation",
        token,
        body: {
          spotId: spot.spotId,
          startDateTime: spot.startDateTime,
          endDateTime: spot.endDateTime,
        },
      }),

    onSuccess: () => {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content: "Reservation created successfully.",
        },
      ]);
    },

    onError: (error) => {
      console.error(error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content: "The reservation could not be created.",
        },
      ]);
    },
  });

  const handleReserve = (spot: AvailableSpot) => {
    if (!token) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content: "Please log in before making a reservation.",
        },
      ]);

      return;
    }

    reservationMutation.mutate(spot);
  };

  const mutation = useMutation({
    mutationFn: (message: string) =>
      create({
        url: "prompts/chat",
        token,
        body: {
          message,
          conversationId,
        },
      }),

    onSuccess: (response) => {
      console.log(response.data);
      console.log(response.data.availableSpots);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content: response.data.message,
          availableSpots: response.data.availableSpots ?? [],
        },
      ]);
    },

    onError: (error) => {
      console.error(error);
    },
  });

  const handleSendMessage = () => {
    sendMessage(message);
  };

  if (minimized) {
    return (
      <button
        type="button"
        onClick={() => setMinimized(false)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-green-600 p-4 text-white shadow-xl"
      >
        <Bot size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[560px] w-96 flex-col overflow-hidden rounded-xl border bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-green-600 px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <Bot size={18} />
          <span className="font-semibold">AI Parking Assistant</span>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setMinimized(true)}>
            <Minus className="cursor-pointer" size={18} />
          </button>

          <button type="button" onClick={onClose}>
            <X className="cursor-pointer" size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="rounded-lg bg-gray-100 p-3 text-sm">
          <p>👋 Hi!</p>
          <p>I'm your parking assistant.</p>
          <p>How can I help you today?</p>
        </div>

        {messages.map((chatMessage, index) => (
          <div key={index} className="mt-3">
            <div
              className={
                chatMessage.role === "user"
                  ? "ml-auto max-w-[85%] rounded-lg bg-green-600 p-3 text-sm text-white"
                  : "mr-auto max-w-[85%] whitespace-pre-line rounded-lg bg-green-50 p-3 text-sm"
              }
            >
              {chatMessage.content}
            </div>

            {chatMessage.availableSpots?.map((spot) => (
              <div
                key={spot.spotId}
                className="mt-3 rounded-lg border bg-white p-3 shadow-sm"
              >
                <div className="flex gap-3">
                  <img
                    src={spot.imageUrl}
                    alt={spot.parkingName}
                    className="h-24 w-24 rounded-lg object-cover"
                  />

                  <div>
                    <p className="font-semibold">{spot.parkingName}</p>

                    <p className="text-sm text-gray-600">{spot.address}</p>

                    <p className="text-sm text-gray-600">
                      Spot {spot.number} — {spot.spotType}
                    </p>

                    <p className="text-sm text-green-700">
                      €{spot.priceHour?.toFixed(2) ?? "0.00"}/h
                    </p>

                    <button
                      type="button"
                      onClick={() => handleReserve(spot)}
                      disabled={reservationMutation.isPending}
                      className="mt-2 rounded-lg bg-green-600 px-3 py-2 text-sm text-white disabled:opacity-50"
                    >
                      {token ? "Reserve" : "Login to reserve"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {mutation.isPending && (
          <div className="mt-3 rounded-lg bg-gray-100 p-3 text-sm">
            Searching...
          </div>
        )}

        {/* Suggestions */}
        {messages.length === 0 && (
          <div className="mt-4 space-y-3">
            <button
              type="button"
              className="w-full rounded-lg border py-2 text-sm hover:bg-gray-50"
              onClick={() => sendMessage("Find parking near me")}
            >
              Find parking near me
            </button>

            <button
              type="button"
              className="w-full rounded-lg border py-2 text-sm hover:bg-gray-50"
              onClick={() => sendMessage("Check available spaces")}
            >
              Check available spaces
            </button>

            <button
              type="button"
              className="w-full rounded-lg border py-2 text-sm hover:bg-gray-50"
              onClick={() => sendMessage("Help with my booking")}
            >
              Help with my booking
            </button>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t bg-white p-3">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Type your message..."
          rows={1}
          className="flex-1 resize-none overflow-y-auto text-sm outline-none"
        />

        <button
          type="button"
          onClick={handleSendMessage}
          disabled={mutation.isPending}
          className="text-green-600 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default ParkingAssistant;
